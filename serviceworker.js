//Giving the cache a foldername
const cacheName = "cache-insects";

//When the browser reads this for the first time, it caches all the files mentioned in the list.
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll([
        "/insects/",
        "/insects/index.html",
        "/insects/butterfly.jpg/",
        "/insects/butterflies.jpg",
        "/insects/dragonfly.jpg",
      ]);
    })
  );
});

//If the user requests resource 
// (file, html, css, image, css etc.)Then look 
// for it onnline. If not available online, it 
// gets the file from the cache

self.addEventListener("fetch", function(event){
    event.respondWith(
        //The catch is for error handling.
        fetch(event.request).catch(() =>
        caches.open(cacheName).then(cache => cache.match(event.request))
        )
    )
})
