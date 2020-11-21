console.log('hola desde TypeScript');

function add(a:number,b:number){//de esta forma estamos tipando las variables en typescript
return a+b;
}

const sum = add(2,4); //ahora nos dice que sum va ser un numero pero como sabe que es un numero porque cuando 
//le decimos a add que recibe dos numero por logica que delvolver un numero esta es la magia de typescript

console.log(sum)

//TIPOS DE DATOS EN TYPESCRIPT

//primero los booleanos a typescript le basta con que declaremos una variable y le asginemos el true o false
//para saber que es booleano pero si queremos ser mas especificos lo que hacemos es que despues del nombre de la
//variable(a la par) ponemos dos puntos luego un espacio y el tipo de dato que queremos

//let muted = false; ya sabe que muted es boolean pero si queremos ser mas especificos

let muted: boolean = false; //estamos especificando el tipo de datos directamente y ya podemos reasignar la variable
 muted = true; //y no hay problema 
 //pero si le queremos asginar otro tipo de datos que no sea booleano ya nos data error esto es de las cosas
 //que javascript dejaria pasar per typescript no
 //muted = "hola" esta se señala como error

 //Otro tipo de dato es Numeros

 let numerador = 42;//aqui ya sabe que es de tipo number el dato pero por ejemplo en el de abajo se lo podemos indicar
 let denominador: number = 21;//le indicamos directamente que es un numero
 let suma = numerador/denominador;//como se le pasan dos number eso lo reconoce y ya sabe que suma va ser de tipo number tambien si que se lo digamos

 //OTRO tipo de datos es el String

 let nombre: string = 'Carlos';
 let saludo = `hola que tal me llamo ${nombre}`//como le pasamos nombre a saludo este automaticamente sabe que es string son necesidad de asignarle ese tipo dato


 //OTRO tipo de dato son los Arreglos 
 /**
  * por ejemplo en c los arreglos son de un solo tipo de valores los arreglos
  * en JS no importa el tipo de datos que le agreguemos a los arreglos
  * en TS se lo podemos indicar los tipos de datos que esperaria recibir y el orden en que los esperara
  */

  let people: string[] = []; //lo que estamos indicando alli con string[] es que es un arreglo de string y lo declaramos vacio
  people = ['juan','carlos ','maria',]; //si agregamos algo que no sea string nos arrojara un error

  //si escribrimos el arreglo luego punto se nos mostrara todos los metodos que podemos usar para ese arreglo
  //ejemplo
  //people.push(9000)//si le queremos añadir un numero nos marca error pero si le pasmos un string no da error

  //Arreglo de tipo Number

let numbers: number[] = [];// es un arreglo de tipo number

numbers = [1,2,3,4];//asignando los valores

//si queremos un array que acepte dos tipos ya sea numero y string hacemos lo siguiente

let numbersPeople: Array<string | number> =[];//escribimos Array ojo la primera a mayuscula luego entre los simbolos de mayor y menor que escribimos el tipo de dato luego escribimos el simbolo | y luego le decimos que podria tambien haber otro tipo de valores en este caso number 

numbersPeople = ['hola','soy',4];//ya no da error aunque sean tipos de datos distintos
  
//si queremos tener una lista de valores y esos valores no tienen que cambiar podemos usar el tipo enum ejemplo
//enum conjunto de valores y esos son ni mas ni menos 
enum color  {
//vamos a inicializar los valores para que no imprima la posicion si no el valor
rojo = "rojo",
verde = "verde",
azul = "azul",
}

//si queremos un valor de estos lo haremos de la siguiente 

let colorFavorito: color = color.azul;

console.log(colorFavorito);//esto nos imprimira la posicion la posicion y no el nombre en si porque no hemos inicializado los valores

//tipo de dato any puede tomar cualquier tipo de dato y no dara problemas

let hola: any = "hola";
hola = {type: "hola"};//no hay problema que antes era string y ahora es un objeto porque como es any no hay problema puede ser de cualquier tipo

//Object 

let someObject: object = {type: "Object"};
//es un objeto


//FUNCIONES

function add1(a: number, b: number): number {//con esto le decimos a TS el tipo de valores que espera recibir

    return a+b;//como a y b son numbers ya se sabe que va retornar un valor number pero si queremos ser mas especificos
    //despues de el nombre de la funcion y los parentesis  escribimos dos puntos y el tipo de valor que vamos a retornar
}

const sumar = add(2,4);

//Hay veces que las funciones regresan otras funciones veamos el caso

//si tenemos la siguiente funcion
function createrAdd(a:number): (number) => number {//para decirle que retorne una fucnion hacemos esto () => dentro de los parentesis le indicamos que toma un number y despues de la flecha le ponemos lo que retorna otro numero 
    return function(b: number){//retorna una funcion
        return b+a;//va retornar la suma del parametro que recibe la funcion que la retorna mas el que recibe la retornada
    }
}


const four = createrAdd(4);
const functionSix = four(6);

//Hay veces que no todos los parametros son obligatorios algunos son opcionales

function fullName(firstName: string, lastName?: string): string{ //para lograr que el lastName sea opcional le agregamos antes de los :  un signo ? lo que le dice que puede ser undefine
return `${firstName} ${lastName}`
}
    
//creo la constante que quiero pasarle la funcion pero si yo no tengo el lastName y le quiero pasar
//solo el firsName yo quiero que no me lo tome como malo que podemos hacer 
const carlos = fullName('carlos', )//como el segundo parametro puede ser undefine acepete que solo le pase un valor como parametro

//las interfaces nos permiten declarar la forma que tiene un objeto esto puede ser util porque nos ayuda en el autocompletado

interface rectangulo {
    ancho: number,
    alto: number,
}

//luego lo invocamos

let rect: rectangulo = {
    ancho: 4,
    alto: 6
}

//por ejemplo si queremos el area y que reciba a un rectangulo lo podemos hacer de la siguiente manera

function area(r: rectangulo): number {
    return r.alto * r.ancho
}

//luego le pasamos el rectangulo a area

let resultado = area(rect);//listo



