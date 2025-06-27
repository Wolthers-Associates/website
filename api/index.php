<?php
require_once __DIR__ . '/users.php';

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

header('Content-Type: application/json');

if (preg_match('#^/api/users/?$#', $path)) {
    if ($method === 'GET') {
        listUsers();
    } elseif ($method === 'POST') {
        createUser();
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
    exit;
}

if (preg_match('#^/api/users/(\d+)$#', $path, $m)) {
    $id = (int)$m[1];
    if ($method === 'GET') {
        getUser($id);
    } elseif ($method === 'PUT') {
        updateUser($id);
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
    exit;
}

http_response_code(404);
echo json_encode(['error' => 'Not found']);
?>
