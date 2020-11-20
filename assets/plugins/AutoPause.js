class AutoPause { //va ser el encardo de ver donde esta el objeto video y ponerle pausa


    //vamos a crear un constructor para poder usar el threshold en cualquier parte del codigo usando la referencia this
    constructor() {
        this.threshold = 0.25;
        this.handlerIntersection = this.handlerIntersection.bind(this)
            //esto lo usamos porque siempre hacemos referencia a this se va referir a base de la funcion que lo esta llamando
            //por eso no lo podemos usar bind para establecer el this permanentemente this va ser permanente a la instancia de este objeto
            //ahora siempre que usemos o llamemos a esta funcion handlerIntersection se va referir a la instancia de este plugin con this que usamos alli
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
        this.estado = true; //esto es para ver si se le dio pausa automaticamente por el IntersectioObserver
        //si se le dio pausa automanticamente aunque nos cambiemos de pagina o tab no queremos que se reproduzca cuando regresemos
        //no tiene logica por defecto es true

    };


    run(player) { //trabaja con run igual que todos nuestros plugin y recibe como parametro a player

        //aqui dentro de run vamos a crear un nuevo IntersectionObserver para eso hacemos los siguiente

        this.player = player; //guardar en player en una instancia de la clase para poder usarlo en handlerIntersection

        /**
        este recibe dos parametros el primero es en handler 
        que es una funcion que recibe el anuncio de hey hubo una interseccion en el elemento que estas 
        observando y el segundo parametro es un objeto de configuracion
        en este cas el handler lo vamos a hacer en un metodo que se va añadir a la clase y el objeto de configuracion
        es de pasarle un umbral(threshold) que define que porcentaje del elemento tiene que tener interseccion 
        con el contenedor para que me interese y me avise en este caso lo usaremos con un 25% en este caso vamos a ver 
        cuanso sobrepase el 25% tanto por encima como por debajo
         */
        const observer = new IntersectionObserver(this.handlerIntersection, {
            // threshold: 0.25 como ya lo tengo en el constructor ya no lo necesito llamar asi
            threshold: this.threshold //ya sabemos que es 0.25
        })

        /**
         * el observer se va poner a observar en este caso lo que se va poner a observar va ser a media que es 
         * un elemento y cual va ser nuestro contenedor pues va ser nuestra pantalla
         */
        observer.observe(this.player.media)

        document.addEventListener("visibilitychange", this.handleVisibilityChange);
        //lo que vamos a hacer es escuchar el evento para poder saber si se cambio de tab o no
        //asi poder ponerle pausa si se cambia 
    }

    /**
     * cuando IntersectionObserver llame a handlerIntersection este le va pasar una lista de entries
     * estos entries son todos los objetos que estamos observando en este caso solo es uno por eso
     * le digo que entry va ser el unico que ssta en la lista
     */

    handlerIntersection(entries) {
        const entry = entries[0]; //el unico entry que esta en la lista es el que estamos observando
        console.log(entry) //si lo vemos en el navegador vemos que nos da un entry desde el comienzo porque de una vez estamos 
            //visualizando el elemento en si pero si empezamos a bajar con el scroll
            //cuando sobrepase el 25% del elemento nos dara un mensaje donde nos avisa 
            //si inspeccionamos el mensaje vamos a ver la parte que nos interesa que es 
            //intersectionRatio que inicialmente tiene que estar en uno y cuando baje de 0.25 se dispara nuestro observador

        /**
         * lo que vamos a hacer es ver si el video va vajando o va subiendo para poder darle play o pause
         * 
         */
        //const isVisible = entry.IntersectionRadio

        if (entry.intersectionRatio <= this.threshold) {

            this.player.pause(); //para el pause
            this.estado = false; //si el observador le pone pausa el estado cambia a false para que no se le pueda dar play aunque regresemos de otra tab
        } else if (entry.intersectionRatio >= this.threshold) {
            this.player.play(); //para la play
            this.estado = true; //cuando el observador le pone play al video y nos cambiamos de tab si queremos que se le ponga pausa porque eso vuelve a true
        }




        //como ya hicimos el this.player = player ya podemos usarlo aqui porque es nuestro objeto superior
        // this.player.play();//para el play
        // this.player.pause();//para la pausa

    }





    //esta funcion nos va permitir saber si se ha cambiado de tab para poder ponerle pausa o no
    //tenenmos que hacer lo mismo que hicimos con handleIntersection para lo del this si no nos 
    //funcionara lo del this.media.play() porque no lo encontrara por a quien se hace referencia no a al plugin
    handleVisibilityChange() {
        //&& this.player.paused === !true

        if (document.visibilityState === "visible" && this.estado === true) { //si esta visible es porque estoy en la pagina si no es porque esta hidden
            //el if anterior solo va devolver true si se cumplen las dos condiciones es decir que si el observer le dio pausa no cumplira y si le di pausa yo mismo si cumplira
            //si estoy en la pestaña donde esta el video se pone play
            this.player.play();
            // console.log('entro play')
        } else {
            //si me cambio de pestaña donde esta el video se pone pausa
            this.player.pause();
            // console.log('entro pausa')
        }



    }
}

export default AutoPause; //exportando la clase de la autopausa