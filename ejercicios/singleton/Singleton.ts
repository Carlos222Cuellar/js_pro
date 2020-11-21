class Singleton {
     //tiene tres propiedades el singleton la primera es una instancia privada y statica

private static instance: Singleton; //la instancia es del mismo tipo que su clase

    //su constructor es privado
   private  constructor (){
//init va un tipo de inicializacion ya sea privada publica no importa
    }

    //el metodo publico que devuelve la instancia es statico y se usa con el nombre getInstance

    static getInstance() {
        //tiene que retornar la misma instancia siempre la primera vez la instancia no existe por eso la tenemos que crear
        //pero cuando la volvamos a llamar simplemente regresamos la que ya existe

        if(!Singleton.instance){//preguntamos si ya existe
           Singleton.instance = new Singleton();//aunque instance es privado como estamos en la misma clase lo podemos llamar
        }

        //si el if no se cumple es porque ya existe la instancia por lo tanto simplemente retornamos la que ya existe

        return Singleton.instance;

    }
}

export default Singleton;