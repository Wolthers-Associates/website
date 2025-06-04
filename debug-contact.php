<?php
// Debug version of contact.php with detailed logging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load environment variables
function loadEnv($path) {
    if (!file_exists($path)) {
        error_log("DEBUG: .env file not found at: " . $path);
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

// Load environment variables
loadEnv('.env');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Log all requests
error_log("DEBUG: Request method: " . $_SERVER['REQUEST_METHOD']);
error_log("DEBUG: Content type: " . ($_SERVER['CONTENT_TYPE'] ?? 'not set'));

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("DEBUG: Method not allowed: " . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$raw_input = file_get_contents('php://input');
error_log("DEBUG: Raw input: " . $raw_input);

$input = json_decode($raw_input, true);
error_log("DEBUG: Decoded input: " . print_r($input, true));

// Validate input
if (!$input) {
    error_log("DEBUG: Invalid JSON data");
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$department = trim($input['department'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

error_log("DEBUG: Form data - Name: $name, Email: $email, Department: $department, Subject: $subject");

// Validation
if (empty($name) || empty($email) || empty($department) || empty($subject) || empty($message)) {
    error_log("DEBUG: Missing required fields");
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    error_log("DEBUG: Invalid email address: $email");
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

error_log("DEBUG: Recipient email: $recipientEmail");

if (!array_key_exists($department, $departmentEmails) && $department !== 'logistics@wolthers.com') {
    error_log("DEBUG: Invalid department: $department");
    echo json_encode(['success' => false, 'message' => 'Invalid department']);
    exit;
}

// Get Microsoft Graph API settings from environment variables
$tenant_id = getenv('AZURE_TENANT_ID');
$client_id = getenv('AZURE_CLIENT_ID');
$client_secret = getenv('AZURE_CLIENT_SECRET');
$sender_email = getenv('SENDER_EMAIL');

error_log("DEBUG: Environment vars - Tenant: " . ($tenant_id ? 'set' : 'missing') . 
          ", Client: " . ($client_id ? 'set' : 'missing') . 
          ", Secret: " . ($client_secret ? 'set' : 'missing') . 
          ", Sender: " . ($sender_email ? $sender_email : 'missing'));

// Check if required environment variables are set
if (!$tenant_id || !$client_id || !$client_secret || !$sender_email) {
    error_log("DEBUG: Missing environment variables");
    echo json_encode(['success' => false, 'message' => 'Email service not configured. Please contact us directly.']);
    exit;
}

/**
 * Get access token from Microsoft Graph API
 */
function getAccessToken($tenant_id, $client_id, $client_secret) {
    error_log("DEBUG: Getting access token...");
    
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
        error_log("DEBUG: Failed to get access token - HTTP request failed");
        throw new Exception('Failed to get access token');
    }
    
    $token_data = json_decode($result, true);
    
    if (isset($token_data['error'])) {
        error_log("DEBUG: Token error: " . $token_data['error_description']);
        throw new Exception('Token error: ' . $token_data['error_description']);
    }
    
    error_log("DEBUG: Access token obtained successfully");
    return $token_data['access_token'];
}

/**
 * Send email using Microsoft Graph API
 */
function sendEmailViaGraph($access_token, $sender_email, $recipient_email, $subject, $body, $reply_to_email, $reply_to_name) {
    error_log("DEBUG: Sending email via Graph API to: $recipient_email");
    
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
    
    error_log("DEBUG: Email data prepared");
    
    $options = [
        'http' => [
            'header' => "Authorization: Bearer $access_token\r\n" .
                        "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($email_data),
            'ignore_errors' => true
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    // Check for HTTP errors
    if ($result === FALSE) {
        $error = error_get_last();
        error_log("DEBUG: HTTP request failed: " . $error['message']);
        throw new Exception('HTTP request failed: ' . $error['message']);
    }
    
    // Check HTTP response code
    $http_code = explode(' ', $http_response_header[0])[1];
    error_log("DEBUG: HTTP response code: $http_code");
    
    if ($http_code != '202') { // Microsoft Graph returns 202 for successful email send
        error_log("DEBUG: Graph API error. HTTP Code: $http_code. Response: $result");
        throw new Exception('Graph API error. HTTP Code: ' . $http_code . '. Response: ' . $result);
    }
    
    error_log("DEBUG: Email sent successfully via Graph API");
    return true;
}

try {
    error_log("DEBUG: Starting email send process...");
    
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
    
    // Log successful submission
    error_log("DEBUG: Contact form submitted successfully via Graph API to: $recipientEmail from: $email");
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.'
    ]);
    
} catch (Exception $e) {
    error_log("DEBUG: Contact form Graph API error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again or contact us directly. Error: ' . $e->getMessage()
    ]);
}
?>
