function AutoPlay() {}

//queremos que autoplay automaticamente le de play al video para eso necesita tener acceso a este video para eso tiene que recibir uan instancia de mediaPlayer
AutoPlay.prototype.run = function(player) {
        //tenemos que crear algo que nos diga si esta muted o no si es muted se da play si no se ponde muted y luego se da play
        if (!player.muted) { //si no esta en muted lo pondremos muted
            //player.mute(); //para esto tenemos que tenerlo creado el mediaPlayer
            //como player ya es limitado no tiene acceso a todo lo que tenemos que hacer es añadir muted vamos a añadir una nueva propiedad virtual con set
            //si no esta muted lo queremos hacer muted
            player.muted = true; //como es un set no lo llamamos como una funcion simplemente le pasmos el valor
        }
        player.play(); //como no se le puede dar play a un video sin que el usuario tenga interaccion con este lo que hacemos es mutearlo antes de que entre al play

        //funcion agregada por mi lo que hace el setTimeOut es esperar un segundo desde que se reproduce
        //el video y verifica que si esta en mudo el video le ponga sonido despues de un segundo de tiempo
        // setTimeout(() => {
        //     if (player.muted) {
        //         player.muted = false;
        //     }

        // }, 10);

    } //

export default AutoPlay;