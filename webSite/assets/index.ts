//tenemos que importar el archivo que queremos usar

import mediaPlayer from '@carlos_cuellar/plazimediaplayer'
import AutoPlay from '@carlos_cuellar/plazimediaplayer/lib/plugins/AutoPlay' // vamos a ser capaz de hacer funcionar el autoplay sin que nos de error en el navegador
import AutoPause from '@carlos_cuellar/plazimediaplayer/lib/plugins/AutoPause' //vamos a traer la clase de autopause para saber en que posicion de la pantalla esta mi video y asi poder darle pausa automaticamente
//este como es un nuevo plugin se lo pasamos al arreglo de plugin en la instancia de mediaPlayer
import Ads from '@carlos_cuellar/plazimediaplayer/lib/plugins/Ads' //plugin de Ads



const video = document.querySelector('video'); //agarrar el elemento video para poder manipularlo
const playPause: HTMLElement = document.querySelector('#playPause'); //agarrar el elemento button playPause para poder manipularlo
const muteUnmute: HTMLElement = document.querySelector('#muteUnmute'); //agarrar el boton para poder manipularlo y hacer que el usuario lo pueda escuchar el video


//a los botones de playPause y muteUnmute TS no esta seguro que son por eso mas abao no reconoce lo onclick es 
//de indicarle que son un elemento de html


//instaciamos la clase
const player = new mediaPlayer({
    el: video,
    plugins: [new AutoPlay(), new AutoPause(),new Ads()] //aqui le pasamos los objetos de configuracion con la clase de AutoPlay instanciada
}); //aqui le mandaremos el objeto de configuracion
//ahora ya podemos llamar a la clase con el metodo play para mandarselo al boton

playPause.onclick = () => player.toggleplay(); //al metodo onclick le pasamos una funcion
muteUnmute.onclick = () => player.muteUnmute();

/**
 * que es el service workers es un capa que vive intermedio del navegador y el internet muy parecido a las proxy
 * permite capturar peticiones esto hace que pueda funcionar offline
 */

if ('serviceWorker' in navigator) { //le vamos a preguntar al navegador si tiene service workers
    //si entra es porque tiene 
    navigator.serviceWorker.register('/sw.js').catch(error => { //registrar el archivo de serviceworker
        console.log(error.message); //si hay error capturamos el error con catch y lo mostramos en la consola
    })
}