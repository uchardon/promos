/* eslint-disable no-console */

// 29.03.2023, version 1.1.1

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App bib.promos is being served from cache by a service worker."
      );
      // For more details, visit https://goo.gl/AFskqB
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      // registration.update();
      // window.location.reload(true);
      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name);
      });
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
