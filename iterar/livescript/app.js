
console.log(es_par(103855));

function es_par(numero){
	if(numero % 2 == 0 ){
		return true;
	}
	return false;
}

console.log(Math.ceil(0.2));

var amatista = "Apellido";
var safiro = 'Nombre ' + amatista;
console.log(safiro);


var perro = "moco";
if(perro.indexOf("moco") != -1){
	console.log("si lo eres")
} else {
	console.log("no lo eres");
}

// operadores logicos

/*
|| -> or
&& -> and
== ===  ->
!=  !== ->
!   ->   
*/

var numUno = 2;
var numDos = 3;

if (numDos > numUno){
	console.log("entrar al servicio");
}else {
	console.log("no entrar al servicio");
}

var mentira = true;
var lie = true;
if(mentira && lie){
	console.log("esas son puras emes");
}

var soloUna = true;
var soloOne = false;

if(soloUna || soloOne){
	console.log("basta con que una sea verdad");
}


var iguales = 30;
var equal = "30";

if (iguales == equal) {
	console.log("no pasan los iguales");
}

var noIguales = 30;
var noEqual = "30";

if (noIguales !== noEqual) {
	console.log("operador rarito");
}

/* otro */

var contador = 1;
while(contador <= 10){
	// esto es lo mismo
	// contador = contador + 1;
	// que esto
	contador++;
	if(contador % 2 !== 0){
		continue;
	}console.log(contador);
}

// mas ciclo do while

var sumatoria = 1;
do{
	sumatoria ++;
	console.log(sumatoria);
	if(sumatoria >= 10){
		break;
	}
}while(true);


// ciclo for

var arreglo = ["hola","mundo"];

for(var i = 0;i<arreglo.length;i++){
	console.log(arreglo[i]);
}


//  la propiedad typeof

var churufo = true;

console.log(typeof churufo);



// ejercicio

var max = 100;
var min = 1;

var num_secreto = Math.random() * (max-min) + min;
num_secreto = parseInt(num_secreto);

console.log(num_secreto);

var mensaje = "Ingresa un número para adivinar cual es el número";

while(true){
	var num_del_user = prompt(mensaje,"0");
	num_del_user = parseInt(num_del_user);
		if(num_del_user === num_secreto){
			alert("Ganaste! el ejercicio abusa de los ALERT");
			break;
		}else if (num_del_user === 0){
			break;
		}
		else if (num_del_user > num_secreto){
			mensaje = "Lo sentimos pero tu numero es MAYOR al que estas buscando";
		}else if (num_del_user < num_secreto){
			mensaje = "Lo sentimos pero tu numero es MENOR al que estas buscando";
		}
}

// http://www.w3schools.com/js/js_popup.asp






