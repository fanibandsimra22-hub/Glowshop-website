<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

$username = isset($data['username']) ? trim($data['username']) : '';
$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? $data['password'] : '';

if (!$username || !$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Please fill all fields.']);
    exit;
}

$usersFile = 'users.json';
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

// Check for duplicate email
foreach ($users as $user) {
    if ($user['email'] === $email) {
        echo json_encode(['success' => false, 'message' => 'Email already registered.']);
        exit;
    }
}

// Add user
$users[] = [
  'username' => $username,
  'email' => $email,
  'password' => password_hash($password, PASSWORD_DEFAULT) // Secure hash
];
file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));

echo json_encode(['success' => true, 'message' => 'Registration successful!']);
?>
