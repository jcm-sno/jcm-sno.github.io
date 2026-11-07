import assert from "node:assert/strict";
import test from "node:test";
import { scheduleTabPrefetch } from "../app/components/schedule-tab-prefetch.mjs";

function browser({ loaded = false, heroLoading = false, saveData = false } = {}) {
  const timers = new Map();
  const idle = new Map();
  const fetched = [];
  let id = 0;
  const hero = Object.assign(new EventTarget(), { complete: !heroLoading });
  const window = Object.assign(new EventTarget(), {
    navigator: { onLine: true, connection: { saveData } },
    setTimeout: (fn) => { timers.set(++id, fn); return id; },
    clearTimeout: (id) => timers.delete(id),
    requestIdleCallback: (fn) => { idle.set(++id, fn); return id; },
    cancelIdleCallback: (id) => idle.delete(id),
  });
  const document = Object.assign(new EventTarget(), {
    readyState: loaded ? "complete" : "loading",
    visibilityState: "visible",
    querySelector: () => hero,
  });
  const cancel = scheduleTabPrefetch({
    window, document, currentHref: "/logistics/",
    hrefs: ["/", "/logistics/", "/registry/", "/rsvp/"],
    prefetch: (href) => fetched.push(href),
  });
  const run = (queue) => {
    const callbacks = [...queue.values()];
    queue.clear();
    callbacks.forEach((fn) => fn());
  };
  return { window, document, hero, fetched, cancel, tick: () => run(timers), idle: () => run(idle) };
}

test("waits for load and idle, then warms every other tab once", () => {
  const b = browser();
  b.tick(); b.idle();
  assert.deepEqual(b.fetched, []);
  b.document.readyState = "complete";
  b.window.dispatchEvent(new Event("load"));
  b.tick();
  assert.deepEqual(b.fetched, [], "Work must wait for an idle opportunity");
  b.idle(); b.tick(); b.idle(); b.tick(); b.idle(); b.tick(); b.idle();
  assert.deepEqual(b.fetched, ["/", "/registry/", "/rsvp/"]);
  b.cancel();
});

test("waits for a newly navigated hero and cancels stale page work", () => {
  const b = browser({ loaded: true, heroLoading: true });
  b.tick(); b.idle();
  assert.deepEqual(b.fetched, []);
  b.hero.complete = true;
  b.hero.dispatchEvent(new Event("load"));
  b.tick();
  b.cancel();
  b.idle();
  assert.deepEqual(b.fetched, []);
});

test("pauses while hidden or offline, resumes when visible and online", () => {
  const b = browser({ loaded: true });
  b.document.visibilityState = "hidden";
  b.tick(); b.idle();
  assert.deepEqual(b.fetched, []);
  b.document.visibilityState = "visible";
  b.window.navigator.onLine = false;
  b.document.dispatchEvent(new Event("visibilitychange"));
  b.tick(); b.idle();
  assert.deepEqual(b.fetched, []);
  b.window.navigator.onLine = true;
  b.window.dispatchEvent(new Event("online"));
  b.tick(); b.idle();
  assert.deepEqual(b.fetched, ["/"]);
  b.cancel();
});

test("respects a visitor's data-saving preference", () => {
  const b = browser({ loaded: true, saveData: true });
  b.tick(); b.idle();
  assert.deepEqual(b.fetched, []);
});
