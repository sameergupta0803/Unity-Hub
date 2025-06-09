<?php
$host = 'localhost';
$user = 'root';       // Your MySQL username
$pass = '';      // Your MySQL password
$db   = 'unity-hub';

// Establish connection
$conn = mysqli_connect($host, $user, $pass, $db);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
