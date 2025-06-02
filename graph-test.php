<?php
// Load environment variables
function loadEnv($path) {
    if (!file_exists($path)) {
        echo "Error: .env file not found!<br>";
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

echo "<h2>Microsoft Graph API Configuration Test</h2>";

echo "<h3>Environment Variables:</h3>";
echo "Tenant ID: " . ($tenant_id ? "✓ Set" : "✗ Missing") . "<br>";
echo "Client ID: " . ($client_id ? "✓ Set" : "✗ Missing") . "<br>";
echo "Client Secret: " . ($client_secret ? "✓ Set" : "✗ Missing") . "<br>";
echo "Sender Email: " . ($sender_email ? "✓ Set ($sender_email)" : "✗ Missing") . "<br><br>";

if (!$tenant_id || !$client_id || !$client_secret || !$sender_email) {
    echo "<strong style='color: red;'>Please configure all environment variables in .env file</strong>";
    exit;
}

echo "<h3>Testing Access Token:</h3>";

try {
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
        throw new Exception('Failed to get access token - HTTP request failed');
    }
    
    $token_data = json_decode($result, true);
    
    if (isset($token_data['error'])) {
        throw new Exception('Token error: ' . $token_data['error_description']);
    }
    
    if (isset($token_data['access_token'])) {
        echo "✓ <strong style='color: green;'>Access token obtained successfully!</strong><br>";
        echo "Token type: " . $token_data['token_type'] . "<br>";
        echo "Expires in: " . $token_data['expires_in'] . " seconds<br>";
        echo "Scope: " . $token_data['scope'] . "<br><br>";
        
        echo "<h3>Testing Graph API Call:</h3>";
        
        // Test a simple Graph API call
        $graph_url = "https://graph.microsoft.com/v1.0/users/$sender_email";
        $graph_options = [
            'http' => [
                'header' => "Authorization: Bearer " . $token_data['access_token'] . "\r\n",
                'method' => 'GET'
            ]
        ];
        
        $graph_context = stream_context_create($graph_options);
        $graph_result = file_get_contents($graph_url, false, $graph_context);
        
        if ($graph_result !== FALSE) {
            $user_data = json_decode($graph_result, true);
            if (isset($user_data['mail']) || isset($user_data['userPrincipalName'])) {
                echo "✓ <strong style='color: green;'>Graph API is working! User found.</strong><br>";
                echo "User: " . ($user_data['displayName'] ?? 'N/A') . "<br>";
                echo "Email: " . ($user_data['mail'] ?? $user_data['userPrincipalName']) . "<br>";
            } else {
                echo "⚠ <strong style='color: orange;'>Graph API responded but user data incomplete</strong><br>";
                echo "Response: " . $graph_result . "<br>";
            }
        } else {
            echo "✗ <strong style='color: red;'>Graph API call failed</strong><br>";
        }
        
    } else {
        echo "✗ <strong style='color: red;'>No access token in response</strong><br>";
        echo "Response: " . $result . "<br>";
    }
    
} catch (Exception $e) {
    echo "✗ <strong style='color: red;'>Error: " . $e->getMessage() . "</strong><br>";
}

echo "<br><h3>Next Steps:</h3>";
echo "1. If access token works: Your Graph API is configured correctly!<br>";
echo "2. If errors: Check your Azure app registration and permissions<br>";
echo "3. Make sure to grant admin consent for the Mail.Send permission<br>";
?>
