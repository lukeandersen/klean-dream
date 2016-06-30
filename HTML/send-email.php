<?php
    
    $email_to =   'email@domain.com'; // Update to your email address
    $name     =   $_POST['name'];  
    $email    =   $_POST['email'];
    $message  =   $_POST['message'];
    
    $headers  = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if(mail($email_to, $subject, $message, $headers)){
        echo 'sent'; // success     
    }else{
        echo 'failed'; // error  
    }
?>