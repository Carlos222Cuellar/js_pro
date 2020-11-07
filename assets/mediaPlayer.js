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
}

//ahora vamos a crear un objeto de la funcion
// mediaPlayer.prototype.play = () => {
//     video.play(); //le daremos play al video
// };
//quitamos lo de arriba ya que para ocupar this no nos funciona las arrow function

mediaPlayer.prototype.play = function() {
    //ahora lo que quermos hacer es que cuando este en pausa le podamos dar play y videversa
    //para eso usaremos los metodo de la API del DOM para saber si esta pausado  y para ponerle pausa
    if (this.media.paused) { //preguntamos si esta pausado para dar le play
        this.media.play(); //con esto le daremos play al video
    } else { //si no esta pausado entonces significa que esta en play entonces lo pondremos en pausa
        this.media.pause(); //se pone en pausa el video

    }
}

//ahora vamos hacer que nuestro modulo sea exportable a otro archivo de js

export default mediaPlayer;