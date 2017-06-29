self.addEventListener('install', function(event) {
  var CACHE_NAME = 'ibm-mna-cache-v1'
  var urlsToCache = [
    '/',
    '/login',
    '/dist/master.min.css',
    '/dist/index-bundle.min.js'
  ]

  self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          console.log('Opened cache')
          return cache.addAll(urlsToCache)
        })
    )
  })
})
