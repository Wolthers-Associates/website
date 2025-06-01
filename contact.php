<?php
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';
require_once 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

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

// ============================================
// IMPORTANT: Configure these settings for your Office 365 account
// ============================================
$smtp_host = 'smtp.office365.com';
$smtp_port = 587;
$smtp_username = 'daniel@wolthers.com'; // Replace with your actual Office 365 email
$smtp_password = '4^ZbCqCKgQ8W!AT'; // Replace with your app password (see instructions below)
$from_email = 'daniel@wolthers.com'; // Same as username
$from_name = 'Wolthers & Associates Website contact';

try {
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = $smtp_host;
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = $smtp_port;
    
    // Sender and recipient
    $mail->setFrom($from_email, $from_name);
    $mail->addTo($recipientEmail);
    $mail->addReplyTo($email, $name);
    
    // Content
    $mail->isHTML(false); // Set to true if you want HTML email
    $mail->Subject = "Website Contact: " . $subject;
    
    $emailBody = "New contact form submission from Wolthers & Associates website\n\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Department: " . ($departmentEmails[$department] ?? 'Logistics Support') . "\n";
    $emailBody .= "Subject: " . $subject . "\n\n";
    $emailBody .= "Message:\n" . $message . "\n\n";
    $emailBody .= "---\n";
    $emailBody .= "This message was sent from the Wolthers & Associates website contact form.\n";
    $emailBody .= "Timestamp: " . date('Y-m-d H:i:s') . " UTC\n";
    $emailBody .= "IP Address: " . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']) . "\n";
    
    $mail->Body = $emailBody;
    
    $mail->send();
    
    // Log successful submission
    error_log("Contact form submitted successfully to: $recipientEmail from: $email");
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.'
    ]);
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again or contact us directly.'
    ]);
}
?>
