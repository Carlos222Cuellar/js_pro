//aqui vamos a implementar como tal el plugin 

//importar mediaPlayer porque lo requiere player

import mediaPlayer from '../../mediaPlayer'
//tambien queremos una instancia de ls ads que voy a estar tomando
import Ads, {Ad} from './Ads'//importamos entre llaves tambien la interface

class AdsPlugin{
    //le tenemos que dar tipado a las variables
    private ads: Ads;
    private player: mediaPlayer;
    private media: HTMLMediaElement;
    private adContainer: HTMLElement;
private currentAd:  Ad;//este nos va decir cual es el ads actual
    //vamos a inicializar el valor en el constructor
    constructor(){
        //recordemos que usa el patrin Singleton por lo tanto no hay constructor publico asi que lo hacemos con el metodo

        this.ads =  Ads.getInstance();
        this.adContainer = document.createElement('div');//lo creamos y vamos a decir que es un div
        //el problema con el handlerTimeUpdate es que como lo llama media el this no va ser el que queremos para eso lo tenemos que bindear
        this.handlerTimeUpdate = this.handlerTimeUpdate.bind(this);
    }

    //recordemos que todos los plugin tienen un metodo run que recibe un player que es de tipo player
    run(player: mediaPlayer){
        this.player = player;
        this.player.container.appendChild(this.adContainer);//agregamos el div de los add al container del video
        this.media = this.player.media;
        /**
         * Los mediaelement tiene  un evento que se llama timeudate cada vez que pasa un cierto tiempo avisa que se actualizao el tiempo
         * 
         */
        this.media.addEventListener('timeupdate',this.handlerTimeUpdate)

    }
    private handlerTimeUpdate(){

        //cada 30s vamos a anunciar algo
        const currentTime = Math.floor(this.media.currentTime)//con floor le quitamos los decimales

        if(currentTime % 30 ===0) {//si el modulo se divide entre 30 exacto entra
//queremos deplegar un add
this.renderAd();
        }
    }

    //creando la funcion que es privada

    private renderAd(){
        //si ya tenemos un ad no mostremos otro
        if(this.currentAd){
            return;
        }
        //vamos a tomar un add
        const ad = this.ads.getAd();
        this.currentAd = ad;
        //lo mostramos 
        //console.log(ad); ya no lo queremos en consola si no en el contenedor

        //vamos a crear un conteiner donde van a estar todos los ads que creemos y estos a su vez van a estar dentro del contenedor
        //creemos el relleno para el div que esta vacio
        this.adContainer.innerHTML = `
        <div class="ads">
        <a  class="ads__link" href="${this.currentAd.url}" target="_blank">
          <img class="ads__img" src="${this.currentAd.imageUrl}" />
          <div class="ads__info">
            <h5 class="ads__title">${this.currentAd.title}</h5>
            <p class="ads__body">${this.currentAd.body}</p>
          </div>
        </a>
      </div>
        `;

        //queremos quitar los add para que salga otro

        setTimeout(
            ()=>{
                this.currentAd=null//lo vuelve nulo
                this.adContainer.innerHTML=''//el html lo vacia
            },10000
        )


    }
}

export default AdsPlugin;