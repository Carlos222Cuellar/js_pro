//definir algunas interfaces de los objetos

//creando observer
interface Observer { //va recibir actualizacion de lainformacion
    update: (data: any) => void;//recibe cualquier tipo de dato y regresa void es decir puede regresar undefine
}

interface Subject {
    //expondra dos funciones
    subscribe: (observer: Observer) => void;//va recibir un observer y regresa nada
    unsubscribe: (observer: Observer) => void;//va recibir un observer y lo va desubcribir
}


//creando la clase de la implementacion concreta

class BitcoinPrice implements Subject {//recibe los cambios de precios y les avisa  alos subscriptores
observers: Observer[] = [];//lista de observadores de tipo observer y va comenzar vacia

//quien va llamar a notify pues en teoria es el imput para eso creamos el contructor
constructor(){
    const el: HTMLInputElement= document.querySelector('#value')
    //cuando value cambie de valor se lo vamos a querer notificar a todos nuestros usuarios+

    el.addEventListener('input', () =>{
        this.notify(el.value);
    })
}


//implementa la clase de Subject
    subscribe(observer: Observer){//clase publica que recibe un observer y los añade a la lista de observer
        this.observers.push(observer) 
    }

    unsubscribe (observer: Observer){//recibe el observer que ya no quiere ser parte de la lista
        const index = this.observers.findIndex(obs =>{//queremos saber cual es el index de ese observer
            //usando el findIndex recibe una funcion que va a recibir un observer y es de encontrar si obs es la misma que observer
        
            return obs === observer//si lo encuentra lo devuelbve
        })

        this.observers.splice(index, 1);//con splice lo que queremos es eliminar a ese observer de esa lista

    }

    //cuando el precio cambie es de notificar
    notify(data: any){
        //queremos notificarselo a todos los usuarios
        this.observers.forEach(observer => observer.update(data))//se le pasan los datos que hayan cambiado
    }
}

//como ya tenemos lo de arriba ahora el price va actuar como el display para eso hacemos los siguiente

class priceDisplay implements Observer{
private el: HTMLElement;

constructor(){
    this.el = document.querySelector("#price")
}

//Cada vez que se llame update queremis cambiar el valor de element
    update(data: any){
this.el.innerText = data;
}
}

//ahora queremos generar instancias para suscribirlas

const value = new BitcoinPrice();
const display = new priceDisplay();

//ahora tenemos que subscribir los display a los cambios de valor 

value.subscribe(display);

//vamos a crear un setTimeOut para que despues de 5 segundos deje de estar suscrito

setTimeout(()=>
    value.unsubscribe(display),
    5000
)