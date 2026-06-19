/* SENTRY service worker — optional.
   Makes notifications more reliable inside an installed iOS web app and lets a
   tap on a notification focus/open the dashboard. No background polling happens
   here: a static service worker cannot evaluate signals while the app is closed.
   For true closed-app alerts you need a push server or a TradingView alert. */

self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow("./");
    })
  );
});
