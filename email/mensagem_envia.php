<!-- Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/ -->

<!-- Este site foi desenvolvido pelo GAPE PIXEL 
como objeto de estudo, foi um redesign
de um site do W3layouts.-->
<!DOCTYPE html>
<html lang="pt-br">
<head>
   <meta charset="UTF-8">
   <title>Jornada da Computação e Educação</title>

   <meta name="description" content="SF ..... "/>
   <meta name="viewport" content="width=device-width, initial-scale=1"/>
   <meta http-equiv="X-UA-Compatible" content="IE=edge">

   <link rel="stylesheet" href="../css/bootstrap.min.css">
   <link rel="stylesheet" href="../css/style.css">

   <link rel="icon" href="../images/icone.png">
</head>
<body>
   <div id="interface-mensagem_envia">
      <?php
         $nome = $_POST['nome'];
         $email = $_POST['email'];
         $assunto = $_POST["assunto"];
         $mensagem = $_POST['mensage'];
         
         require 'vendor/autoload.php';

         $from = new SendGrid\Email(null, "$email");
         $subject = "$assunto";
         $to = new SendGrid\Email(null, "matheus.franco@ifsuldeminas.edu.br"); 
         $content = new SendGrid\Content("text/html", "Nova mensagem de contato!<br><br>Nome: $nome <br>Email: $email <br>Assunto: $assunto <br>Mensagem: $mensagem");
         $mail = new SendGrid\Mail($from, $subject, $to, $content);
           
         //Necessário inserir a chave
         $apiKey = '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';
         $sg = new \SendGrid($apiKey);

         $response = $sg->client->mail()->send()->post($mail);
         $mensagemSucesso = "Mensagem enviada com sucesso!";  
      ?>
      <div id="mensagem" class="container-fluid text-center">
         <h3><?php echo "$mensagemSucesso"; ?></h3>
         <a href="../index.html#service2" class="btn btn-primary"><span class="fa fa-arrow-left"></span> Voltar para o site</a>
      </div>
   </div> 
</body>
</html>