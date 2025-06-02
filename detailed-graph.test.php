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

echo "<h2>Enhanced Microsoft Graph API Diagnostic Test</h2>";

echo "<h3>Environment Variables:</h3>";
echo "Tenant ID: " . ($tenant_id ? "✓ Set (" . substr($tenant_id, 0, 8) . "...)" : "✗ Missing") . "<br>";
echo "Client ID: " . ($client_id ? "✓ Set (" . substr($client_id, 0, 8) . "...)" : "✗ Missing") . "<br>";
echo "Client Secret: " . ($client_secret ? "✓ Set (" . str_repeat('*', 20) . ")" : "✗ Missing") . "<br>";
echo "Sender Email: " . ($sender_email ? "✓ Set ($sender_email)" : "✗ Missing") . "<br><br>";

if (!$tenant_id || !$client_id || !$client_secret || !$sender_email) {
    echo "<strong style='color: red;'>Please configure all environment variables in .env file</strong>";
    exit;
}

echo "<h3>Testing Basic Connectivity:</h3>";

// Test 1: Basic internet connectivity
echo "1. Testing basic HTTP connectivity...<br>";
$test_url = "https://httpbin.org/get";
$context = stream_context_create([
    'http' => [
        'timeout' => 10,
        'method' => 'GET'
    ]
]);

$result = @file_get_contents($test_url, false, $context);
if ($result !== false) {
    echo "✓ <span style='color: green;'>Basic HTTP connectivity: OK</span><br>";
} else {
    echo "✗ <span style='color: red;'>Basic HTTP connectivity: FAILED</span><br>";
    echo "This suggests a server networking issue.<br>";
}

// Test 2: SSL/HTTPS connectivity to Microsoft
echo "<br>2. Testing HTTPS connectivity to Microsoft...<br>";
$ms_test_url = "https://login.microsoftonline.com";
$ms_result = @file_get_contents($ms_test_url, false, $context);
if ($ms_result !== false) {
    echo "✓ <span style='color: green;'>Microsoft endpoints accessible: OK</span><br>";
} else {
    echo "✗ <span style='color: red;'>Microsoft endpoints: BLOCKED</span><br>";
    echo "Your hosting provider might be blocking Microsoft domains.<br>";
}

// Test 3: Detailed token request with error handling
echo "<br><h3>Testing Access Token (Detailed):</h3>";

$token_url = "https://login.microsoftonline.com/$tenant_id/oauth2/v2.0/token";
echo "Token URL: " . $token_url . "<br><br>";

$data = [
    'client_id' => $client_id,
    'client_secret' => $client_secret,
    'scope' => 'https://graph.microsoft.com/.default',
    'grant_type' => 'client_credentials'
];

echo "Request data (client_secret hidden):<br>";
foreach ($data as $key => $value) {
    if ($key === 'client_secret') {
        echo "- $key: " . str_repeat('*', 20) . "<br>";
    } else {
        echo "- $key: $value<br>";
    }
}
echo "<br>";

// Enable error reporting for debugging
$options = [
    'http' => [
        'header' => [
            "Content-type: application/x-www-form-urlencoded",
            "User-Agent: Wolthers-Website/1.0"
        ],
        'method' => 'POST',
        'content' => http_build_query($data),
        'timeout' => 30,
        'ignore_errors' => true  // This allows us to see error responses
    ],
    'ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true
    ]
];

$context = stream_context_create($options);

echo "Making request to Microsoft...<br>";
$result = @file_get_contents($token_url, false, $context);

// Check for HTTP response headers
if (isset($http_response_header)) {
    echo "<br><strong>HTTP Response Headers:</strong><br>";
    foreach ($http_response_header as $header) {
        echo htmlspecialchars($header) . "<br>";
    }
    echo "<br>";
}

if ($result === false) {
    echo "✗ <span style='color: red;'>HTTP request completely failed</span><br>";
    
    $error = error_get_last();
    if ($error) {
        echo "<strong>Last PHP Error:</strong> " . htmlspecialchars($error['message']) . "<br>";
    }
    
    echo "<br><strong>Possible causes:</strong><br>";
    echo "1. Hosting provider blocks external HTTPS requests<br>";
    echo "2. Firewall blocking Microsoft domains<br>";
    echo "3. SSL/TLS configuration issues<br>";
    echo "4. PHP configuration restricting external requests<br>";
    
} else {
    echo "✓ <span style='color: green;'>HTTP request successful</span><br>";
    echo "<strong>Response:</strong><br>";
    
    $token_data = json_decode($result, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        echo "✗ <span style='color: red;'>Invalid JSON response</span><br>";
        echo "Raw response: " . htmlspecialchars(substr($result, 0, 500)) . "<br>";
    } else {
        if (isset($token_data['error'])) {
            echo "✗ <span style='color: red;'>Microsoft returned an error:</span><br>";
            echo "Error: " . htmlspecialchars($token_data['error']) . "<br>";
            echo "Description: " . htmlspecialchars($token_data['error_description'] ?? 'No description') . "<br>";
            
            if ($token_data['error'] === 'invalid_client') {
                echo "<br><strong>Fix:</strong> Check your Client ID and Client Secret in Azure<br>";
            } elseif ($token_data['error'] === 'unauthorized_client') {
                echo "<br><strong>Fix:</strong> Grant admin consent for permissions in Azure<br>";
            }
        } else {
            echo "✓ <span style='color: green;'>Access token obtained successfully!</span><br>";
            echo "Token type: " . ($token_data['token_type'] ?? 'unknown') . "<br>";
            echo "Expires in: " . ($token_data['expires_in'] ?? 'unknown') . " seconds<br>";
        }
    }
}

echo "<br><h3>Server Configuration Check:</h3>";
echo "PHP Version: " . phpversion() . "<br>";
echo "OpenSSL enabled: " . (extension_loaded('openssl') ? 'Yes' : 'No') . "<br>";
echo "cURL enabled: " . (extension_loaded('curl') ? 'Yes' : 'No') . "<br>";
echo "file_get_contents with URLs: " . (ini_get('allow_url_fopen') ? 'Enabled' : 'Disabled') . "<br>";
echo "Max execution time: " . ini_get('max_execution_time') . " seconds<br>";

echo "<br><h3>Next Steps:</h3>";
echo "1. If HTTP connectivity fails: Contact Hostinger support about external HTTPS requests<br>";
echo "2. If Microsoft endpoints blocked: Ask Hostinger to whitelist *.microsoftonline.com<br>";
echo "3. If 'invalid_client' error: Double-check your Azure Client ID and Secret<br>";
echo "4. If 'unauthorized_client': Grant admin consent in Azure AD<br>";
?>
