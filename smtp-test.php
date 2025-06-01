<?php
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';
require_once 'phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Configure these with your actual Office 365 details
$smtp_username = 'YOUR_OFFICE365_EMAIL@wolthers.com'; // Replace this
$smtp_password = 'YOUR_APP_PASSWORD'; // Replace this
$test_recipient = 'YOUR_OFFICE365_EMAIL@wolthers.com'; // Replace this

try {
    $mail = new PHPMailer(true);
    
    // Enable debugging
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Debugoutput = 'html';
    
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.office365.com';
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    
    // Sender and recipient
    $mail->setFrom($smtp_username, 'Website Test');
    $mail->addTo($test_recipient);
    
    // Content
    $mail->isHTML(false);
    $mail->Subject = 'SMTP Test - Office 365 Connection';
    $mail->Body = 'This is a test email to verify Office 365 SMTP configuration is working properly.';
    
    $mail->send();
    echo '<h2 style="color: green;">SUCCESS! Office 365 SMTP is working correctly.</h2>';
    
} catch (Exception $e) {
    echo '<h2 style="color: red;">FAILED! Error: ' . $e->getMessage() . '</h2>';
}
?>
