<?php
session_start();
require 'db.php'; // This should create $conn using mysqli_connect()

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize form data
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    // Prepare SQL statement to find user by email
    $stmt = mysqli_prepare($conn, "SELECT * FROM Users WHERE email = ?");
    
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        
        if ($user = mysqli_fetch_assoc($result)) {
            // Verify the password
            if (password_verify($password, $user['password'])) {
                // Password is correct: create session
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_name'] = $user['name'];

                echo json_encode([
                    'status' => 'success', 
                    'message' => 'Login successful',
                    'email' => $user['email'],
                    'name' => $user['name']
                ]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid credentials']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'User not found']);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to prepare statement']);
    }

    mysqli_close($conn);
    exit;
}
