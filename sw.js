self.addEventListener("install",  e => {
    e.waitUntil(
        caches.open("static").then(caches =>{
            
        })
    );
});