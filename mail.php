<?php

require 'vendor/autoload.php';

if (isset($_POST)) {
    $mail = new PHPMailer;

    //$mail->SMTPDebug = 3;                               // Enable verbose debug output

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'irisrefuelling.com';                   // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'bafsadmin';     // SMTP username
    $mail->Password = 'irisiris2020';                     // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to
    $mail->CharSet = 'UTF-8';
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->setFrom('bafsadmin@irisrefuelling.com', 'IRIS Refuelling');
    $mail->addAddress('irisrefuelling@gmail.com');     // Add a recipient
    $mail->addReplyTo($_POST['email']);

    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = '[Web Inquiry - IRIS REFUELLING] ' . $_POST['subject'];

    $message = "";
    $message .= "<h1>" . $_POST["subject"] . "</h1>";
    $message .= "<hr>";
    $message .= "Inquiry Name: " . $_POST["name"] . "<br>";
    $message .= "Company Name: " . $_POST["company"] . "<br>";
    $message .= "E-Mail: " . $_POST["email"] . "<br>";
    $message .= "Phone Number: " . $_POST["phone"] . "<br>";
    $message .= "<hr>";
    $message .= nl2br($_POST["message"]);

    $mail->Body = $message;

    if(!$mail->send()) {
        echo "<script>alert('Error, Please try again later.'); window.location.href = 'http://irisrefuelling.com';</script>";
        //echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo "<script>alert('Message has been sent'); window.location.href = 'http://irisrefuelling.com'</script>";
    }

} else {
    header('Location: http://irisrefuelling.com');
}

?>
