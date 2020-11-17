//tenemos que importar el archivo que queremos usar

import mediaPlayer from './mediaPlayer.js'
import AutoPlay from './plugins/AutoPlay.js' // vamos a ser capaz de hacer funcionar el autoplay sin que nos de error en el navegador
import AutoPause from './plugins/AutoPause.js' //vamos a traer la clase de autopause para saber en que posicion de la pantalla esta mi video y asi poder darle pausa automaticamente
//este como es un nuevo plugin se lo pasamos al arreglo de plugin en la instancia de mediaPlayer


const video = document.querySelector('video'); //agarrar el elemento video para poder manipularlo
const playPause = document.querySelector('#playPause'); //agarrar el elemento button playPause para poder manipularlo
const muteUnmute = document.querySelector('#muteUnmute'); //agarrar el boton para poder manipularlo y hacer que el usuario lo pueda escuchar el video

//instaciamos la clase
const player = new mediaPlayer({
    el: video,
    plugins: [new AutoPlay(), new AutoPause()] //aqui le pasamos los objetos de configuracion con la clase de AutoPlay instanciada
}); //aqui le mandaremos el objeto de configuracion
//ahora ya podemos llamar a la clase con el metodo play para mandarselo al boton

playPause.onclick = () => player.toggleplay(); //al metodo onclick le pasamos una funcion
muteUnmute.onclick = () => player.muteUnmute();