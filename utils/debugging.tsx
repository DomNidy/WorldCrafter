export function logAllEventListeners() {
  Array.from(document.querySelectorAll("*")).forEach((element, idx) => {
    for (const k in element) {
      if (k.startsWith("on") || !!(element as Record<string, any>)[k]) {
        console.log((element as Record<string, any>)[k], k, typeof k);
        console.log(typeof (element as Record<string, any>)[k]);
      }
    }
  });
}
