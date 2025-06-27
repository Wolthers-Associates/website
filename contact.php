<?php
require_once __DIR__ . '/mailer.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data']);
    exit;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$department = trim($input['department'] ?? '');
$subject = trim($input['subject'] ?? '');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($department) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

$departmentEmails = [
    'trading@wolthers.com' => 'Trading Inquiries',
    'logistics@wolthers.com' => 'Logistics Support',
    'qualitycontrol@wolthers.com' => 'Quality Control Services'
];

$recipientEmail = $department;
if ($department === 'logistics@wolthers.com') {
    $recipientEmail = 'wolthers@wolthers.com';
}

if (!array_key_exists($department, $departmentEmails) && $department !== 'logistics@wolthers.com') {
    echo json_encode(['success' => false, 'message' => 'Invalid department']);
    exit;
}

try {
    $email_subject = 'Website Contact: ' . $subject;
    $email_body = "New contact form submission from Wolthers & Associates website\n\n";
    $email_body .= 'Name: ' . $name . "\n";
    $email_body .= 'Email: ' . $email . "\n";
    $email_body .= 'Department: ' . ($departmentEmails[$department] ?? 'Logistics Support') . "\n";
    $email_body .= 'Subject: ' . $subject . "\n\n";
    $email_body .= "Message:\n" . $message . "\n\n";
    $email_body .= "---\n";
    $email_body .= 'This message was sent from the Wolthers & Associates website contact form.' . "\n";
    $email_body .= 'Timestamp: ' . date('Y-m-d H:i:s') . ' UTC' . "\n";
    $email_body .= 'IP Address: ' . ($_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR']) . "\n";

    sendGraphMail($recipientEmail, $email_subject, $email_body, $email, $name);

    error_log("Contact form submitted successfully via Graph API to: $recipientEmail from: $email");

    echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent successfully. We will get back to you soon.']);
} catch (Exception $e) {
    error_log('Contact form Graph API error: ' . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again or contact us directly.']);
}
?>
