
function $(selector){
	return document.querySelector(selector);
}

var mi_clase = $(".mi_clase");
console.log(mi_clase);



// mas ejercicio
var arrego = [20,"hola m",true];

arrego.unshift(7);
arrego.push(200);

console.log(arrego);

// ciclo

var poke = [200,5000,200,453];
var i = poke.length;
for(;i>= 0;i--){
	console.log([i]);
}

// funciones

function miFuncio(a,b){
	return a*b;
}

console.log(miFuncio(6,5));

//


function $(selector){
	return document.querySelector(selector);
}


// ff
(function(){ 
	function orde(a,b){
		return a -b;
	}

	var arr = "2,300,5,1,10,20,100".split(",");
	arr.sort(orde);
	arr.reverse();
	console.log(arr);
})();
// ecma 5
(function(){
	var nam = [20,30,506,704,345,345,23,235,676,76,4];
	 var nu_par = nam.filter(function(numero){
	 	return numero % 2 === 0;
	 });
	 console.log(nu_par);
})();

// cuadrados con ECMA 5
(function(){
	var abecedario = [10,3,6];

	var cuadrados = abecedario.map(function(elemento){
	 	return elemento * elemento;
	 });
	console.log(cuadrados);
})();

// callback
(function(){
	setTimeout(function( ) {
		console.log(dibi("callBack"));
		// body...
	},2500);


})();
function dibi(nombre) {
	function construct(){
		return "Hola " +nombre;
	}
	return construct();
}

// month closure bien hecho

var getMonth = (function() {
    var months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio",
        "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
 
    return function(n) {
        if (n < 1 || n > 12)
            throw new RangeError("Mes incorrecto");
        return months[n-1];
    };
 
}()); //end IIFE
 
console.log( getMonth(12) );



//inicio closure
function init (name) { //función padre
 
    //esta variable solo se incializa
    //la primera vez que se invoca init()
    var _time = +new Date();
 
    //lazy function definition
    init = function(name) { //función anidada
        console.log("User: " + name + " >");
        console.log("Init time: " + _time);
    }
 
    init(name);
}
//fin closure
 
init("David");
setTimeout(function() {
    init("Jherax");
}, 500);


//inicio closure
function paddingLeft (quantity, fillchar) { //función externa
    quantity = quantity || 2;
    fillchar = fillchar || "0";
 
    return function (text) { //función interna
        var filled = new Array(quantity).join(fillchar) + text;
        return filled.slice(-quantity);
    };
}
//fin closure
 
var zeroPad = paddingLeft();
console.log( zeroPad(9) );
 
var dotPad = paddingLeft(20, ".");
console.log( dotPad("pg 13") );
console.log( dotPad("pg 17") );


/* otro */


















