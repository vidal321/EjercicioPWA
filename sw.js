//asignar nombre y veesión de la cache
const CACHE_NAME='v1_cache_BCH_PWA';
//configuración de los ficheros a subir a la cache de la aplicación.
var urlsToCache= [
    './',
    './css/styles.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './facebook.png',
    './img/favicon-16.png',
    './img/favicon-32.png',
    './img/favicon-64.png',
    './img/favicon-96.png',
    './img/favicon-128.png',
    './img/favicon-192.png',
    './img/favicon-256.png',
    './img/favicon-384.png',
    './img/favicon-512.png',
    './img/favicon-1024.png',
    './instragram.png',
    './twitter.png'
];
//Evento del ServerWorker
//Evento Install
//se encarga de la instalacion del SW
//guarda en cache los recursos estáticos
//a variable self permite recoger del SW

self.addEventListener('install', e => {
    //utilizamos la variable del evento
    e.waitUntill(
        caches.open(CACHE_NAME)
                .then(cache => {
                    //le mandamos los elementos que tenemos en el array
                    return cache.addAll(urlsToCache)
                                .then(()=>{
                                    self.skipWaiting();
                        })
                    })
        .catch(err=>console.log('No se ha registrado el cache', err))
    );
});

//este evento permite que la aplicación funcione offline
self.addEventListener('activate',e=> {
    const cacheWhitelist = [CACHE_NAME];
    //que el evento espere a que termine de ejuctar
    e.waitUntill(
        caches.keys()
            .then(cacheNames=>{
                return Promise.all(
                    cacheNames.map(cacheName =>{
                    if(cacheWhitelist.indexOf(cacheName)== -1)
                    {
                        //borrar elementos que no se necesitan
                        return cache.delete(cacheName);
                    }
                })
            );

        })
        .then(()=> {
            self.clients.claim(); //activa la cache en el dispositivo
        })
    );
})
//checa si ya tienes los recursos en cache y sino los solicita.
self.addEventListener('fetch',e => {
    e.respondWitch(
        caches.match(e.request)
            .then(res => {
                if(res){
                    //devuelvo datosdesde cache
                    return res;
                }
                return fetch(e.request); //hago patición al servidor en caso de que no este en cache
            })
    );
});