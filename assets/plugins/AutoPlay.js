function AutoPlay() {}

//queremos que autoplay automaticamente le de play al video para eso necesita tener acceso a este video para eso tiene que recibir uan instancia de mediaPlayer
AutoPlay.prototype.run = function(player) {
        player.mute(); //para esto tenemos que tenerlo creado el mediaPlayer
        player.play(); //como no se le puede dar play a un video sin que el usuario tenga interaccion con este lo que hacemos es mutearlo antes de que entre al play

    } //

export default AutoPlay;