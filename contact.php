<?php
// Load environment variables from .env file
function loadEnv($path) {
    if (!file_exists($path)) {
        return false;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue; // Skip comments
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Load environment variables
loadEnv('.env');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$department = trim($input['department'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

// Validation
if (empty($name) || empty($email) || empty($department) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Department email mapping
$departmentEmails = [
    'trading@wolthers.com' => 'Trading Inquiries',
    'logistics@wolthers.com' => 'Logistics Support',
    'qualitycontrol@wolthers.com' => 'Quality Control Services'
];

// Map logistics to the correct email
$recipientEmail = $department;
if ($department === 'logistics@wolthers.com') {
    $recipientEmail = 'wolthers@wolthers.com';
}

if (!array_key_exists($department, $departmentEmails) && $department !== 'logistics@wolthers.com') {
    echo json_encode(['success' => false, 'message' => 'Invalid department']);
    exit;
}

// Get Microsoft Graph API settings from environment variables
$tenant_id = getenv('AZURE_TENANT_ID');
$client_id = getenv('AZURE_CLIENT_ID');
$client_secret = getenv('AZURE_CLIENT_SECRET');
$sender_email = getenv('SENDER_EMAIL'); // The Office 365 account that will send emails

// Check if required environment variables are set
if (!$tenant_id || !$client_id || !$client_secret || !$sender_email) {
    error_log("Microsoft Graph API credentials not configured in environment variables");
    echo json_encode(['success' => false, 'message' => 'Email service not configured. Please contact us directly.']);
    exit;
}

/**
 * Get access token from Microsoft Graph API
 */
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

/**
 * Send email using Microsoft Graph API
 */
function sendEmailViaGraph($access_token, $sender_email, $recipient_email, $subject, $body, $reply_to_email, $reply_to_name) {
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
                    'emailAddress' => [
                        'address' => $recipient_email
                    ]
                ]
            ],
            'replyTo' => [
                [
                    'emailAddress' => [
                        'address' => $reply_to_email,
                        'name' => $reply_to_name
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
            'content' => json_encode($email_data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    // Check for HTTP errors
    if ($result === FALSE) {
        $error = error_get_last();
        throw new Exception('HTTP request failed: ' . $error['message']);
    }
    
    // Check HTTP response code
    $http_code = explode(' ', $http_response_header[0])[1];
    if ($http_code != '202') { // Microsoft Graph returns 202 for successful email send
        throw new Exception('Graph API error. HTTP Code: ' . $http_code . '. Response: ' . $result);
    }
    
    return true;
}

try {
    // Get access token
    $access_token = getAccessToken($tenant_id, $client_id, $client_secret);
    
    // Prepare email content
    $email_subject = "Website Contact: " . $subject;
    $email_body = "New contact form submission from Wolthers & Associates website\n\n";
    $email_body .= "Name: " . $name . "\n";
    $email_body .= "Email: " . $email . "\n";
    $email_body .= "Department: " . ($departmentEmails[$department] ?? 'Logistics Support') . "\n";
    $email_body .= "Subject: " . $subject . "\n\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= "This message was sent from the Wolthers & Associates website contact form.\n";
    $email_body .= "Timestamp: " . date('Y-m-d H:i:s') . " UTC\n";
    $email_body .= "IP Address: " . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']) . "\n";
    
    // Send email via Microsoft Graph
    sendEmailViaGraph($access_token, $sender_email, $recipientEmail, $email_subject, $email_body, $email, $name);
    
    // Log successful submission (without sensitive data)
    error_log("Contact form submitted successfully via Graph API to: $recipientEmail from: $email");
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.'
    ]);
    
} catch (Exception $e) {
    error_log("Contact form Graph API error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again or contact us directly.'
    ]);
}
?>
