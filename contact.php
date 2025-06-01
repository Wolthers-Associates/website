<?php
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

if (!array_key_exists($department, $departmentEmails)) {
    echo json_encode(['success' => false, 'message' => 'Invalid department']);
    exit;
}

// Email configuration
$to = $department;
$emailSubject = "Website Contact: " . $subject;
$headers = [
    'From' => "noreply@wolthers.com",
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
];

// Email body
$emailBody = "New contact form submission from Wolthers & Associates website\n\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Department: " . $departmentEmails[$department] . "\n";
$emailBody .= "Subject: " . $subject . "\n\n";
$emailBody .= "Message:\n" . $message . "\n\n";
$emailBody .= "---\n";
$emailBody .= "This message was sent from the Wolthers & Associates website contact form.\n";
$emailBody .= "Timestamp: " . date('Y-m-d H:i:s') . " UTC\n";
$emailBody .= "IP Address: " . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']) . "\n";

// Convert headers array to string
$headerString = '';
foreach ($headers as $key => $value) {
    $headerString .= $key . ': ' . $value . "\r\n";
}

// Send email
try {
    $success = mail($to, $emailSubject, $emailBody, trim($headerString));
    
    if ($success) {
        // Log successful submission (optional)
        error_log("Contact form submitted successfully to: $to from: $email");
        
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.'
        ]);
    } else {
        // Log error
        error_log("Failed to send contact form email to: $to from: $email");
        
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to send email. Please try again or contact us directly.'
        ]);
    }
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    echo json_encode([
        'success' => false, 
        'message' => 'An error occurred while sending your message. Please try again.'
    ]);
}
?>