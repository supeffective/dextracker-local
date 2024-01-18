/*
Service worker that handles the installation and activation events.

- During installation, it calls self.skipWaiting()to ensure that the new service worker takes control immediately.
- During activation, it unregisters the previous service worker, navigates all open clients to their current URLs, 
  and deletes all caches.
*/

self.addEventListener('install', (e) => {
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  self.registration
    .unregister()
    .then(() => self.clients.matchAll())
    .then((clients) => {
      clients.forEach((client) => {
        if (client instanceof WindowClient) {
          client.navigate(client.url)
        }
      })
      return Promise.resolve()
    })
    .then(() => {
      self.caches.keys().then((cacheNames) => {
        Promise.all(
          cacheNames.map((cacheName) => {
            return self.caches.delete(cacheName)
          }),
        )
      })
    })
})
