//button.onclick = () => video.play();
/*
 *el play se saca porque todos los elementos del DOM tienen una API aveces son diferentes 
 *y aveces son parecidos si queremos saber cuales son los del video ponemos en el navegador
 * mdn htmlmediaelement y alli los veremos
 */

//queremos que el codigo este de mejor manera para eso haremos una funcion
//y hay un problema este video esta hardcodeado y esta embebido en la clase y eso no lo hace practico
//una mejor forma seria pasar a esta funcion on objeto de configuracion

//PARA PODER USAR TS EN AutoPause VAMOS A REESCRIBIR ESTO COMO UNA class
class mediaPlayer {
    media: HTMLMediaElement; //le estamos dando el tipo de elemto que es media y este es un elemento nativo de media que ese usa tanto para video y audio element
    plugins: Array<any>; //va ser un arreglo de any
    container: HTMLElement;
    constructor(config) {
            this.media = config.el;
            //tenemos que crear nuestro plugin que le llegan a traves de este objeto de configuracion
            this.plugins = config.plugins || []; //este puglin tiene que ser capaz de funcionar incluso si no tenemos acceso a este puglin



            //como ya lo añadimos al archivo de configuracion ya podremos ser capaz de usarlo en el index.js
            //  this.pausedByUser = false; NO ME SIRVIO
            //necesitamos un metodo para inicializar los plugins
         //   this._inicializate(); lo usabamos con _ porque deciamos que era un elemento privado que se supone que solo en esta clase se puede llamar o invocar ahora podemos usar private
         this.initPlayer();//vamos a inicializar para asi poder crear el contenedor de forma dinamica y que quede dentro el video
         this.inicializate(); 
            
            // this.player; //NO ME SIRVIO
        }
//vamos a inicializar para asi poder crear el contenedor de forma dinamica y que quede dentro el video
        initPlayer(){
this.container = document.createElement('div') //vamos a crear un elemento html que va ser de tipo div
this.container.style.position = 'relative' //esto lo hacemos para poder usar la poscion absoluta en los ads para que estos se muestren en el mismo lugar siempre
//lo queremos es meter el media dentro de este contenedor
//lo primero es hacer a media pariente del container
this.media.parentNode.insertBefore(this.container,this.media)//le decimos que el container va ir antes de media
this.container.appendChild(this.media)//el container va tener adentro un hijo que va ser media      
}
        //ahora lo vamos a definir _inicializate() ya no con el guin bajo si no private 
    private inicializate() {
            //esta funcion va servir para todos los plugin que tengamos definidos asi que para cada plugin
            // const player = {
            //     play: () => this.play(),
            //     pause: () => this.pause(),


            //     //lo que queremos es saber o tener una propiedad que nos diga si estoy en mudo o en sonido para eso usamos un getter
            //     // paused: this.pausedByUser, NO ME SIRVIO
            //     media: this.media,
            //     get muted() {
            //         //tiene que regresar un vaLOR
            //         return this.media.muted; //este this representa el objeto  que hace la llamada a nuestro objeto actual pero no hay ningun media por lo tanto lo tenemos que crear en el objeto
            //     },
            //     set muted(value) {
            //         this.media.muted = value; //si no esta muted recibe el valor en AutoPlay con true par hacerlo muted
            //     },
            // };
            //SE QUITO EL PLAYER PORQUE YA NO NOS INTERESA USARLO CON TYPESCRIPT
            //si vengo y en vez de usar this en run le paso player este ya no tendra acceso muted, unmuted, etc eso puede ser bueno porque nos da acceso a las caracteristicas que le pasamos
            this.plugins.forEach(plugin => {
                //tenemos que ejecutar este plugin para eso no podemos hacer solo plugin() porque aqui solo lo estamos instanciando para eso le tenemos que llamar un metodo en especifico
                //plugin.run(this); //el this se refiere a una instancia de mediaPlayer(donde ya esta el metodo play que le pasamos al plugin AutoPlay)
                //actualmente le pasamos this a run pero para tener un mejor control de los datos que le pasamos al plugin
                //podemos hacer lo siguiente
                plugin.run(this); //recibe a player PERO COMO YA LO QUITAMOS LE PASAMOS EL this PARA QUE PUEDA USAR TODO
            });
        }
        //ahora vamos a crear un objeto de la funcion
        // mediaPlayer.prototype.play = () => {
        //     video.play(); //le daremos play al video
        // };
        //quitamos lo de arriba ya que para ocupar this no nos funciona las arrow function
    toggleplay() {
        //ahora lo que quermos hacer es que cuando este en pausa le podamos dar play y viceversa
        //para eso usaremos los metodo de la API del DOM para saber si esta pausado  y para ponerle pausa
        if (this.media.paused) { //preguntamos si esta pausado para dar le play
            //this.player.pause = false; NO ME SIRVIO
            this.media.play(); //con esto le daremos play al video


            // console.log(this.pausedByUser)NO ME SIRVIO
        } else { //si no esta pausado entonces significa que esta en play entonces lo pondremos en pausa
            //  this.player.paused = true; NO ME SIRVIO
            this.media.pause(); //se pone en pausa el video


            // console.log(this.pausedByUser)NO ME SIRVIO
        }

    }
    play() {
        //ahora lo que quermos hacer es que cuando este en pausa le podamos dar play
        //para eso usaremos los metodo de la API del DOM para poder darle play
        this.media.play();

    }
    pause() {
            //ahora lo que quermos hacer es que cuando este en play le podamos dar pausa
            //para eso usaremos los metodo de la API del DOM para poder ponerle pausa
            this.media.pause();
        }
        //declarando la funcion para hacer mute al video
    mute() {
            this.media.muted = true;
        }
        //hacer la funcion para quitar el mute
    muteUnmute() {
        if (this.media.muted === true) {
            // console.log('if')
            this.media.muted = false;
        } else {
            // console.log('else')
            this.media.muted = true;
        }
    }
}






//ahora vamos hacer que nuestro modulo sea exportable a otro archivo de js

export default mediaPlayer;