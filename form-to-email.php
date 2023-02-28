<?php
if(!isset($_POST['submit']))
{
    echo "ERROR, Yoju need to submit the form";
}
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

if(empty($name)||empty($email)||empty($email))
{
    echo "Name and Email are required";
}

$email_from = 'hogan.sean1999@gmail.com';
$email_subject = "Reiki at Hope Cottage - Contact";
$email_body = "You have received a new email from $name.\n".
"email Address: $email".
"Message : $message";

$to = 'hogan.sean1999@gmail.com';
$headers = "From: $email_from \r\n";

mail($to,$email_subject,$email_body,$headers);
