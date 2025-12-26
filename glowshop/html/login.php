<?php
header('Content-Type: application/json');

// Get the POST data (sent by JavaScript)
$data = json_decode(file_get_contents('php://input'), true);

$email = isset($data['email']) ? trim($data['email']) : '';
$password = isset($data['password']) ? $data['password'] : '';

if (!$email || !$password) {
    echo json_encode(['success' => false, 'message' => 'Fill in all fields.']);
    exit;
}
$usersFile = 'users.json';
$users = file_exists($usersFile) ? json_decode(file_get_contents($usersFile), true) : [];

// Check each user: does email match?
foreach ($users as $user) {
    if ($user['email'] === $email) {
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Correct password
            echo json_encode([
                'success' => true,
                'message' => 'Login successful!',
                'username' => $user['username'],
                'email' => $user['email']
            ]);
            exit;
        } else {
            // Wrong password
            echo json_encode(['success' => false, 'message' => 'Invalid password.']);
            exit;
        }
    }
}
// No such email found
echo json_encode(['success' => false, 'message' => 'No user found with this email.']);
?>
