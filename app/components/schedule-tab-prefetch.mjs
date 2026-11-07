/** Warm the other pages only after the current document and hero are ready. */
export function scheduleTabPrefetch({ window, document, currentHref, hrefs, prefetch }) {
  const connection = window.navigator.connection;
  if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")) return;

  const queue = [...new Set(hrefs)].filter((href) => href !== currentHref);
  let cancelled = false;
  let idleId;
  let timerId;
  let hero;

  function schedule() {
    if (cancelled || !queue.length || document.visibilityState === "hidden" || !window.navigator.onLine) return;
    timerId = window.setTimeout(() => {
      if (window.requestIdleCallback) idleId = window.requestIdleCallback(warmNext, { timeout: 2000 });
      else warmNext();
    }, 350);
  }

  function warmNext() {
    if (cancelled || document.visibilityState === "hidden" || !window.navigator.onLine) return;
    prefetch(queue.shift());
    schedule();
  }

  function ready() {
    // A client-side return to About may introduce a hero after window.load.
    hero = document.querySelector(".hero-photo");
    if (hero && !hero.complete) {
      hero.addEventListener("load", schedule, { once: true });
      hero.addEventListener("error", schedule, { once: true });
    } else schedule();
  }

  function resume() {
    if (document.readyState !== "complete") return;
    window.clearTimeout(timerId);
    if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
    ready();
  }

  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready, { once: true });
  document.addEventListener("visibilitychange", resume);
  window.addEventListener("online", resume);

  return () => {
    cancelled = true;
    window.clearTimeout(timerId);
    if (idleId !== undefined) window.cancelIdleCallback?.(idleId);
    window.removeEventListener("load", ready);
    document.removeEventListener("visibilitychange", resume);
    window.removeEventListener("online", resume);
    hero?.removeEventListener("load", schedule);
    hero?.removeEventListener("error", schedule);
  };
}
