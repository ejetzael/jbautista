<?php
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$asunto = $_POST['asunto'];
$mensaje = $_POST['mensaje'];
$para = 'e_jetzael@hotmail.com';
$titulo = 'Formulario de intranet 2';
$header = 'From: ' . $email;
$msjCorreo = "Nombre: $nombre\n E-Mail: $email\n Asunto: $asunto\n Mensaje: $mensaje\n";
  
if ($_POST['submit']) {
if (mail($para, $titulo, $msjCorreo, $header)) {
echo "<script language='javascript'>
alert('Gracias por escribir, pronto me comunicare contigo');
window.location.href = 'http://cerveceriachanek.mx/jetzael/iterar/larousse/multicontacto/index.html';
</script>";
} else {
echo 'Falló el envio';
}
}
?>
