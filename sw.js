self.addEventListener('install', event => { //añadir un addeventlistener que se va llamar cuando el navegador instale el seviceworkers y el callback que va llamar va recibir un evento
        event.waitUntil(precache()) //vamos a crear un precache al cual le vamos a pasar una lista de assets que queremos que ya mantenga en cache
    }) //para self es el mismo contexto del this pero de serviceWorker

//lo que queremos hacer es que cuando se haga una peticion primero vaya a preguntar al cache si existe 

//para eso hacemos lo siguiente

self.addEventListener('fetch', event => {
    const request = event.request //vamos a capturar la peticion para eso hacemos un event.request
        //solo queremos hacer algo con los get
    if (request.method !== "GET") {
        return; //si no es get que haga lo que hace normalmente
    }

    //vamos a buscar en el cache a ver si ya lo tenemos

    event.respondWith(cachedResponse(request)) //evente tienen el evento de responder con y vamos a responder con una respuesta cacheada


    //actualizar el cache por si se hacen cambios evitar que el usuario tenga archivos viejos

    event.waitUntil(cacheUpdate(request))

})


async function precache() { //para trabajar con cache es de trabajar con una parte del DOM que se llama caches
    const cache = await caches.open("v1") //esto recibe una promesa entonces lo envolvemos en un async await
        //una vez tenemos una instancia de cache le queremos añadir una lista de recursos

    return cache.addAll([ //lo retornamos porque es una promesa y es lo que espera waitUntil
        //son todos nuestros recursos
        // '/', //Es importante porque todos los request son diferentes en serviceworkers
        // '/index.html',
        // '/assets/index.js',
        // '/assets/mediaPlayer.js',
        // '/assets/plugins/AutoPlay.js',
        // '/assets/plugins/AutoPause.js',
        // '/assets/index.css',
        // '/assets/ejercicio.mp4',

        //Lo comentamos para evitar el error que daba en el navegador lo del serviceWorker ya que parcel le asigna otros nombres a los
        //directorios dentro de la carpeta dist
        //pero lo demas va seguir funcionando exactamente igual
    ])
}


async function cachedResponse(request) {
    const cache = await caches.open("v1");
    //hay que verificar si en el cache esta la respuesta a la peticion

    const response = await cache.match(request) //le estamos preguntando al cache si ya tiene una copia que le responde al esta peticion si no si es no nos devulve undefine
    return response || fetch() // si no ponemos el fecth si no la encuentra la peticion en el cache entonces estariamos devolviendo undefine por eso ponemos lo del fecth para que vaya a la red a darle respuesta a la peticion que hicimos

}

async function cacheUpdate(request) {
    const cache = await caches.open("v1")
    const response = await fetch(request)
    return cache.put(request, response) //con put colocamos el nuevo cache que trajo de la red a request le asignamos response
}