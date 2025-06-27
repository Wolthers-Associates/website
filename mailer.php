<?php
function loadEnvFile($path) {
    if (!file_exists($path)) {
        return false;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = array_pad(explode('=', $line, 2), 2, '');
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
    return true;
}

function getAccessToken(string $tenant_id, string $client_id, string $client_secret): string {
    $url = "https://login.microsoftonline.com/$tenant_id/oauth2/v2.0/token";
    $data = [
        'client_id' => $client_id,
        'client_secret' => $client_secret,
        'scope' => 'https://graph.microsoft.com/.default',
        'grant_type' => 'client_credentials'
    ];
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === false) {
        throw new Exception('Failed to get access token');
    }
    $token_data = json_decode($result, true);
    if (isset($token_data['error'])) {
        throw new Exception('Token error: ' . $token_data['error_description']);
    }
    return $token_data['access_token'];
}

function sendEmailViaGraph(string $access_token, string $sender_email, string $recipient_email, string $subject, string $body, string $reply_to_email = '', string $reply_to_name = ''): bool {
    $url = "https://graph.microsoft.com/v1.0/users/$sender_email/sendMail";
    $email_data = [
        'message' => [
            'subject' => $subject,
            'body' => [
                'contentType' => 'Text',
                'content' => $body
            ],
            'toRecipients' => [
                [
                    'emailAddress' => ['address' => $recipient_email]
                ]
            ],
            'replyTo' => [
                [
                    'emailAddress' => ['address' => $reply_to_email, 'name' => $reply_to_name]
                ]
            ]
        ]
    ];
    $options = [
        'http' => [
            'header' => "Authorization: Bearer $access_token\r\nContent-Type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($email_data)
        ]
    ];
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === false) {
        $error = error_get_last();
        throw new Exception('HTTP request failed: ' . $error['message']);
    }
    $http_code = explode(' ', $http_response_header[0])[1];
    if ($http_code != '202') {
        throw new Exception('Graph API error. HTTP Code: ' . $http_code . '. Response: ' . $result);
    }
    return true;
}

function sendGraphMail(string $to, string $subject, string $body, string $replyToEmail = '', string $replyToName = ''): bool {
    loadEnvFile(__DIR__.'/.env');
    $tenant_id = getenv('AZURE_TENANT_ID');
    $client_id = getenv('AZURE_CLIENT_ID');
    $client_secret = getenv('AZURE_CLIENT_SECRET');
    $sender_email = getenv('SENDER_EMAIL');
    if (!$tenant_id || !$client_id || !$client_secret || !$sender_email) {
        throw new Exception('Email service not configured.');
    }
    $access_token = getAccessToken($tenant_id, $client_id, $client_secret);
    return sendEmailViaGraph($access_token, $sender_email, $to, $subject, $body, $replyToEmail ?: $sender_email, $replyToName);
}
?>
