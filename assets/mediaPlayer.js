//button.onclick = () => video.play();
/*
 *el play se saca porque todos los elementos del DOM tienen una API aveces son diferentes 
 *y aveces son parecidos si queremos saber cuales son los del video ponemos en el navegador
 * mdn htmlmediaelement y alli los veremos
 */

//queremos que el codigo este de mejor manera para eso haremos una funcion
//y hay un problema este video esta hardcodeado y esta embebido en la clase y eso no lo hace practico
//una mejor forma seria pasar a esta funcion on objeto de configuracion
function mediaPlayer(config) {
    this.media = config.el;
    //tenemos que crear nuestro plugin que le llegan a traves de este objeto de configuracion
    this.plugins = config.plugins || []; //este puglin tiene que ser capaz de funcionar incluso si no tenemos acceso a este puglin
    //como ya lo añadimos al archivo de configuracion ya podremos ser capaz de usarlo en el index.js

    //necesitamos un metodo para inicializar los plugins
    this._inicializate();
}

//ahora lo vamos a definir _inicializate()
mediaPlayer.prototype._inicializate = function() {
    //esta funcion va servir para todos los plugin que tengamos definidos asi que para cada plugin
    const player = {
        play: () => this.play(), //play funcion que llama a play ojo es una funcion
        pause: () => this.pause(), //pause funcion que llama a pause
        //lo que queremos es saber o tener una propiedad que nos diga si estoy en mudo o en sonido para eso usamos un getter
        media: this.media,
        get muted() { //se ponde get seguido de la propiedad virtual
            //tiene que regresar un vaLOR
            return this.media.muted; //este this representa el objeto  que hace la llamada a nuestro objeto actual pero no hay ningun media por lo tanto lo tenemos que crear en el objeto
        },
        set muted(value) { //recibe un valor
            this.media.muted = value; //si no esta muted recibe el valor en AutoPlay con true par hacerlo muted
        },


    };
    //si vengo y en vez de usar this en run le paso player este ya no tendra acceso muted, unmuted, etc eso puede ser bueno porque nos da acceso a las caracteristicas que le pasamos

    this.plugins.forEach(plugin => {
        //tenemos que ejecutar este plugin para eso no podemos hacer solo plugin() porque aqui solo lo estamos instanciando para eso le tenemos que llamar un metodo en especifico
        //plugin.run(this); //el this se refiere a una instancia de mediaPlayer(donde ya esta el metodo play que le pasamos al plugin AutoPlay)
        //actualmente le pasamos this a run pero para tener un mejor control de los datos que le pasamos al plugin
        //podemos hacer lo siguiente
        plugin.run(player); //recibe a player
    });
}

//ahora vamos a crear un objeto de la funcion
// mediaPlayer.prototype.play = () => {
//     video.play(); //le daremos play al video
// };
//quitamos lo de arriba ya que para ocupar this no nos funciona las arrow function

mediaPlayer.prototype.toggleplay = function() {
    //ahora lo que quermos hacer es que cuando este en pausa le podamos dar play y viceversa
    //para eso usaremos los metodo de la API del DOM para saber si esta pausado  y para ponerle pausa

    if (this.media.paused) { //preguntamos si esta pausado para dar le play
        this.media.play(); //con esto le daremos play al video

    } else { //si no esta pausado entonces significa que esta en play entonces lo pondremos en pausa
        this.media.pause(); //se pone en pausa el video

    }
}
mediaPlayer.prototype.play = function() {
    //ahora lo que quermos hacer es que cuando este en pausa le podamos dar play
    //para eso usaremos los metodo de la API del DOM para poder darle play
    this.media.play();

}
mediaPlayer.prototype.pause = function() {
    //ahora lo que quermos hacer es que cuando este en play le podamos dar pausa
    //para eso usaremos los metodo de la API del DOM para poder ponerle pausa
    this.media.pause();
}

//declarando la funcion para hacer mute al video
mediaPlayer.prototype.mute = function() {
    this.media.muted = true;
}

//hacer la funcion para quitar el mute

mediaPlayer.prototype.muteUnmute = function() {
    if (this.media.muted === true) {
        // console.log('if')
        this.media.muted = false;
    } else {
        // console.log('else')
        this.media.muted = true;
    }
}


//ahora vamos hacer que nuestro modulo sea exportable a otro archivo de js

export default mediaPlayer;