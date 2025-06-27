<?php
require_once __DIR__ . '/pdo.php';
require_once __DIR__ . '/../mailer.php';

function createUser() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        return;
    }
    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $role = trim($data['role'] ?? '');

    if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
        return;
    }

    try {
        $pdo = getPDO();
        $stmt = $pdo->prepare('INSERT INTO users (name, email, role) VALUES (:n, :e, :r)');
        $stmt->execute([':n' => $name, ':e' => $email, ':r' => $role]);
        $id = $pdo->lastInsertId();

        $subject = 'Registration Successful';
        $body = "Hello $name,\n\nYour account has been created.";
        sendGraphMail($email, $subject, $body);

        echo json_encode(['id' => (int)$id, 'name' => $name, 'email' => $email, 'role' => $role]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error']);
    }
}

function updateUser($id) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        return;
    }
    $fields = [];
    $params = [];
    if (isset($data['name'])) { $fields[] = 'name = :name'; $params[':name'] = trim($data['name']); }
    if (isset($data['email'])) {
        $email = trim($data['email']);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { http_response_code(400); echo json_encode(['error' => 'Invalid email']); return; }
        $fields[] = 'email = :email'; $params[':email'] = $email;
    }
    if (isset($data['role'])) { $fields[] = 'role = :role'; $params[':role'] = trim($data['role']); }
    if (!$fields) { http_response_code(400); echo json_encode(['error' => 'No fields to update']); return; }
    $params[':id'] = $id;

    try {
        $pdo = getPDO();
        // Ensure the user exists before attempting to update
        $checkStmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE id = :id');
        $checkStmt->execute([':id' => $id]);
        if ($checkStmt->fetchColumn() == 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Not found']);
            return;
        }

        $sql = 'UPDATE users SET ' . implode(', ', $fields) . ' WHERE id = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        echo json_encode(['success' => true]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error']);
    }
}

function getUser($id) {
    try {
        $pdo = getPDO();
        $stmt = $pdo->prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?');
        $stmt->execute([$id]);
        $user = $stmt->fetch();
        if (!$user) { http_response_code(404); echo json_encode(['error' => 'Not found']); return; }
        echo json_encode($user);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error']);
    }
}

function listUsers() {
    try {
        $pdo = getPDO();
        $stmt = $pdo->query('SELECT id, name, email, role, created_at FROM users');
        $users = $stmt->fetchAll();
        echo json_encode($users);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Server error']);
    }
}
?>
