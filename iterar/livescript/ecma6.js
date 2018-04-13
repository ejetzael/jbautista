
var template = `hola 
es que es importate
mundio`;

console.log(template);

// template string

function nombre(){
	return 2+5;
}

var saludo = `Hola ${nombre()} espero bien`;
console.log(saludo);


// let -> block scopin | function scoping 

/*
aqui no se modifica el valor de la var = nombre
pese a que esta declarada dos veces pero la segunda es con
let en un bloque interno de la function. Esto significa que
let solo funciona dentro de bloques y var en cualquier para del this
*/

int();
function int(){
	var nombre = "texxxto";
	if(true) {
		let nombre = "tezto";
	}
	console.log(nombre);
}


//nodos


