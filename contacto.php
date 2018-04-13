<?php
$nombre = $_POST['nombre'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];
$para = 'e_jetzael@hotmail.com';
$titulo = 'Vacante de trabajo';
$header = 'From: ' . $email;
$msjCorreo = "Nombre: $nombre\n E-Mail: $email\n Mensaje:\n $mensaje";
  
if ($_POST['submit']) {
if (mail($para, $titulo, $msjCorreo, $header)) {
echo "<script language='javascript'>
alert('Gracias escribir, pronto me comunicare contigo');
window.location.href = 'http://cerveceriachanek.mx/jetzael/';
</script>";
} else {
echo 'Falló el envio';
}
}
?>
