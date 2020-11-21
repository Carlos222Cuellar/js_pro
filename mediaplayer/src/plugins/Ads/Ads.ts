/**
 * lo que queremos es que todos los ads que se esten mostrando 
 * los videos van a estar agarrando los ads de esta clase pero hay la posibilidad  de que se pueda utilizar en 
 * otros lados no solo en mediaPlayer
 * entonces yo no quiero que se dupliquen no enseñar el mismo add que podria se en otro lado 
 * en este caso es posible usar el patron Sigleton lo que va exponer una sola instancia de clase asi 
 * cada objeto que quiera un ads va obtener un ads diferente y nunca lo va repetir
 */

 export interface Ad {//la vamos a exportar para usar luego
     imageUrl: string;
     title: string;
     body: string;
     url: string;

 }

 //vamos a crear la lista de ads que queremos mostrar es decir que mientras miremos el video van a salir pequelos anuncios en la aparte de abajo
 const ALL_ADS: Ad[] = [
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-profesional-javascript-13538df2-24ce-433f-9aa6-e34eed608e70.png',
      title: 'Curso Profesional de JavaScript',
      body:
        'Mejora tus habilidades en Javascript. Conoce Typescript y cómo puedes ocuparlo para mejorar el control de tus variables.',
      url: 'https://platzi.com/cursos/javascript-profesional/',
    },
  
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-frontend-developer-8a49e681-3e22-408d-b886-2f47dfc9953a.png',
      title: 'Curso de Frontend Developer',
      body:
        'Domina las bases de HTML y CSS. Define la arquitectura de tu código y construye un sitio web usando componentes estáticos. ',
      url: 'https://platzi.com/cursos/frontend-developer/',
    },
  
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-backend-node-8e6aa8a9-f7cd-42b7-bf4a-e1ee916a942b.png',
      title: 'Curso de Backend con Node.js',
      body:
        'Crea aplicaciones backend utilizando Node.js, Express y Mongo. Entiende cómo funciona Javascript en un servidor y escribe aplicaciones con Node.js.',
      url: 'https://platzi.com/cursos/backend-nodejs/',
    },
  
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-prework-da6b0493-9908-40f3-ad53-f5d330b995b8.png',
      title:
        'Comienza tus proyectos de desarrollo para JavaScript configurando un entorno de desarrollo cómodo y adaptado a tus necesidades.',
      body:
        'Mejora tus habilidades en Javascript. Conoce Typescript y cómo puedes ocuparlo para mejorar el control de tus variables.',
      url: 'https://platzi.com/cursos/prework/',
    },
  
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-autenticacion-passport-6d45426a-2b24-4757-8927-7bfaf54529dd.png',
      title: 'Curso de Autenticación con Passport.js',
      body:
        'Genera estrategias de autenticación Sign-In y Sign-Out usando Passport.js. Agrega autenticación con Facebook, Twitter y Google a tus desarrollos.',
      url: 'https://platzi.com/cursos/passport/',
    },
  
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-backend-frontend-02b2ac18-331a-4959-85bf-0bd3c2aa009c.png',
      title: 'Curso de Backend for Frontend',
      body:
        'La ingeniería de software evoluciona día a día, no te quedes atrás. Ahora que eres un Desarrollador FullStack JavaScript necesitas evolucionar con el software, construye arquitecturas de software modernas.',
      url: 'https://platzi.com/cursos/bff/',
    },
  
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-react-adec89d0-1c35-4c9c-847e-18c284dc79dd.png',
      title: 'Curso Práctico de React JS',
      body:
        'React es una de las librerías más utilizadas hoy para crear aplicaciones web. Aprende a través de la creación de la interfaz de PlatziVideo todo lo que necesitas para crear increíbles componentes con React.      ',
      url: 'https://platzi.com/cursos/react-ejs/',
    },
  
    {
      imageUrl:
        'https://static.platzi.com/media/achievements/badge-react-redux-2ca3c0a5-fc53-437f-bfba-69e9ddd5a803.png',
      title: 'Curso de React Router y Redux',
      body:
        'Aprende de forma práctica a implementar React Router para manejar rutas en tus proyectos de frontend como un profesional.',
      url: 'https://platzi.com/cursos/react-router-redux/',
    },
  ];

 class Ads {
     //como ya tenemos unpatron lo primero que hacemos es lo siguiente
     private static instance: Ads;//instancia privada y estatica que es de tipo Ads 
private ads: Ad[];//va ser un arreglo de tipo Ad que esta definido en la interfaz arriba
     //luego el constructor que va ser privado
     private constructor (){
//vamos a inicializar los ads
this.initAds();
     }

     //luego la instancia que se va exponer

     static getInstance(){
         if(!Ads.instance){//lo que estamos preguntando es a haber si existe una instancia ya creada si no existe la creamos pero si ya existe solo devolvemos la que ya existe
Ads.instance = new Ads();
         }
         return Ads.instance;
     }

     //hay que inicializar la lista de ads en un metodo privado

     private initAds() {
         this.ads = [...ALL_ADS] //inicializando usamos la destructuracion del objeto original para mantener el original intacto y usar la copia
     }

     //ads tienen que tener la forma de exponer los ads a quien se los pida 

     getAd (){

//COMO VAMOS A ESTAR sacando ads del arreglo se van a acabar porque no son infinitos porlo tanto vamos a validar eso
//vamos a preguntar por el length del arreglo y si es cero lo vamos a volver a inicializar
if(this.ads.length === 0){
    this.initAds();
}

         //todos los ads que tenemos estan en este arreglo
        return this.ads.pop()//pop va sacar un valor de este arreglo y lo va sacar
     }


 }

 export default Ads; //y exportamos la clase Ads