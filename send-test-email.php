<?php
// Load environment variables
function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        putenv(sprintf('%s=%s', $name, $value));
        $_ENV[$name] = $value;
        $_SERVER[$name] = $value;
    }
    return true;
}

loadEnv('.env');

$tenant_id = getenv('AZURE_TENANT_ID');
$client_id = getenv('AZURE_CLIENT_ID');
$client_secret = getenv('AZURE_CLIENT_SECRET');
$sender_email = getenv('SENDER_EMAIL');

echo "<h2>Microsoft Graph API - Test Email Send</h2>";

function getAccessToken($tenant_id, $client_id, $client_secret) {
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
    
    if ($result === FALSE) {
        throw new Exception('Failed to get access token');
    }
    
    $token_data = json_decode($result, true);
    
    if (isset($token_data['error'])) {
        throw new Exception('Token error: ' . $token_data['error_description']);
    }
    
    return $token_data['access_token'];
}

function sendTestEmail($access_token, $sender_email, $recipient_email) {
    $url = "https://graph.microsoft.com/v1.0/users/$sender_email/sendMail";
    
    $email_data = [
        'message' => [
            'subject' => 'TEST: Wolthers Website Contact Form Working!',
            'body' => [
                'contentType' => 'Text',
                'content' => "This is a test email from your Wolthers & Associates website contact form.\n\nMicrosoft Graph API integration is working perfectly!\n\nTimestamp: " . date('Y-m-d H:i:s') . " UTC"
            ],
            'toRecipients' => [
                [
                    'emailAddress' => [
                        'address' => $recipient_email
                    ]
                ]
            ]
        ]
    ];
    
    $options = [
        'http' => [
            'header' => [
                "Authorization: Bearer $access_token",
                "Content-Type: application/json"
            ],
            'method' => 'POST',
            'content' => json_encode($email_data),
            'ignore_errors' => true
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    // Check HTTP response code
    $http_code = explode(' ', $http_response_header[0])[1];
    
    if ($http_code == '202') {
        return true;
    } else {
        throw new Exception("Graph API error. HTTP Code: $http_code. Response: $result");
    }
}

try {
    echo "1. Getting access token...<br>";
    $access_token = getAccessToken($tenant_id, $client_id, $client_secret);
    echo "✓ <span style='color: green;'>Access token obtained</span><br><br>";
    
    echo "2. Sending test email...<br>";
    echo "From: $sender_email<br>";
    echo "To: trading@wolthers.com<br>";
    echo "Subject: TEST: Wolthers Website Contact Form Working!<br><br>";
    
    sendTestEmail($access_token, $sender_email, 'trading@wolthers.com');
    
    echo "✅ <h3 style='color: green;'>SUCCESS! Test email sent successfully!</h3>";
    echo "Check your trading@wolthers.com inbox for the test email.<br>";
    echo "Your contact form is now fully functional with Microsoft Graph API.<br><br>";
    
    echo "<strong>Next steps:</strong><br>";
    echo "1. Check your email inbox<br>";
    echo "2. Test your website contact form<br>";
    echo "3. Delete this test file when done<br>";
    
} catch (Exception $e) {
    echo "❌ <span style='color: red;'>Error: " . htmlspecialchars($e->getMessage()) . "</span><br>";
}
?>
