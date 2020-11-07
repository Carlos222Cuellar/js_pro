//tenemos que importar el archivo que queremos usar

import mediaPlayer from './mediaPlayer.js'

const video = document.querySelector('video'); //agarrar el elemento video para poder manipularlo
const button = document.querySelector('button'); //agarrar el elemento button para poder manipularlo

//instaciamos la clase
const player = new mediaPlayer({
    el: video
}); //aqui le mandaremos el objeto de configuracion
//ahora ya podemos llamar a la clase con el metodo play para mandarselo al boton

button.onclick = () => player.play(); //al metodo onclick le pasamos una funcion