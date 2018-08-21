//cach static assets make tha pp fast 
const staticAssets = [
    './',
    './app.css',
    './app.js'
]
self.addEventListener('install',async event =>{
     //use the cache api 
     const cache = await caches.open('news-static');
     cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    
    const req = event.request;
    const url = new URL(req.url);

    if (url.origin === location.orign) {
        event.respondWith(cacheFirst(req));
    }else{
        event.respondWith(networkFirst(req));
    }

});

async function cacheFirst(req){

    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);

}
async function networkFirst(req){

    const cache = await caches.open('news-dynamic');

    try {
        const res = await fetch(req);
        cache.put(req,res.clone());
        return res; 
    } catch (error) {
        return await cache.match(req);
    }

}