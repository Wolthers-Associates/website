<?php
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'PHP is working!',
    'server_info' => [
        'php_version' => phpversion(),
        'mail_function' => function_exists('mail') ? 'available' : 'not available',
        'request_method' => $_SERVER['REQUEST_METHOD'],
        'timestamp' => date('Y-m-d H:i:s')
    ]
]);
?>
