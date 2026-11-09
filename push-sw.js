// Envoy web push service worker.
//
// relayPush sends a data-only push that carries nothing but {t: "wake"}.
// This worker never reads it: every push shows the same fixed text, as on
// the phones. No Firebase SDK here, so nothing is fetched from a third
// party and FCM never handles notification text.
//
// Registered by PushPlatform.js.kt as "push-sw.js" next to index.html,
// so its scope is the folder Envoy is served from.

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

async function envoyWindows() {
  return self.clients.matchAll({ type: "window", includeUncontrolled: true });
}

self.addEventListener("push", (event) => {
  event.waitUntil((async () => {
    // Envoy is on screen and focused: it shows the note itself. (relayPush
    // already holds pushes while the tab is visible; this covers the gap
    // until that state reaches the server.)
    const windows = await envoyWindows();
    if (windows.some((w) => w.visibilityState === "visible" && w.focused)) return;
    await self.registration.showNotification("Envoy", {
      body: "Update available",
      // One notification at a time: a newer push replaces the old one.
      tag: "envoy-update",
      renotify: true,
    });
  })());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil((async () => {
    const windows = await envoyWindows();
    if (windows.length > 0) return windows[0].focus();
    return self.clients.openWindow(self.registration.scope);
  })());
});
