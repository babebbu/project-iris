<?php

$to = 'nobody@example.com';

$message = "";
$message .= "Inquiry Name: " + $_POST['name'];
$message .= "Company Name: " + $_POST['company'];
$message .= "E-Mail: " + $_POST['email'];
$message .= ":Phone Number: " + isset($_POST['phone']) ? $_POST['phone'] : "Not provided";
$message .= "\n\n";
$message .= "Subject: " + $_POST['subject'];
$message .= "------------------------------";
$message .= $_POST['message'];

mail($to, $subject, $message);

?>
