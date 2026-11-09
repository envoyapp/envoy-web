// Firebase web-app config for Envoy ("P2P Chat Web" in the Firebase console,
// project p2p2). Public by design: it identifies the project, it grants
// nothing — access control is firestore.rules / storage.rules, and the
// Auth authorized-domains list decides which origins may sign in.
window.ENVOY_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBMWinSiS4sTYOQhOTZuwrQR5q65D8Egdc",
  authDomain: "p2p2-98e81.firebaseapp.com",
  projectId: "p2p2-98e81",
  storageBucket: "p2p2-98e81.firebasestorage.app",
  messagingSenderId: "970059577103",
  appId: "1:970059577103:web:85168b6692244c8d38b07a",
};

// Web Push (VAPID) public key: Firebase console -> Project settings ->
// Cloud Messaging -> Web Push certificates. Public too. Empty means this
// build offers no notifications (Settings hides the section).
window.ENVOY_VAPID_KEY = "BBNNw77_eUBE2zdCQaUwpm02dtH0D-y9QhW2BLRqDJ5HIWMn5ilE-90MNqTktJSVobhOhlMbC8uOYFUuNJJcARk";
