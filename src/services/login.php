<?php

include './src/config.php';
 
//Conexão
 $con = mysqli_connect($host,$user,$pass,$db);
 
 $json = file_get_contents('php://input');
 $obj = json_decode($json,true);
 
$cpf = $obj['cpf'];
$password = $obj['password'];

//Query CPF / SENHA
$sql = "SELECT * FROM medico where CPF_MEDICO = '$cpf' and SENHA_MEDICO = '$password' ";
$check = mysqli_fetch_array(mysqli_query($con,$sql));


if(isset($check)){

$SuccessLoginMsg = 'Login feito com sucesso!';
$SuccessLoginJson = json_encode($SuccessLoginMsg);
 
 echo $SuccessLoginJson ; 

 }
 
 else{

$InvalidMSG = 'Login invalido! CPF ou SENHA incorretos, tente novamente.' ;
 
$InvalidMSGJSon = json_encode($InvalidMSG);
 
 echo $InvalidMSGJSon ;
 
 }
 
 mysqli_close($con);
?>