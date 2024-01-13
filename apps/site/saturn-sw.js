;(() => {
  // biome-ignore lint:
  'use strict'
  const e = 'https://saturn.tech'
  // biome-ignore lint:
  'undefined' != typeof ServiceWorkerGlobalScope
    ? // biome-ignore lint:
      importScripts(e + '/saturn-sw-core.js')
    : // biome-ignore lint:
    'undefined' != typeof SharedWorkerGlobalScope
    ? // biome-ignore lint:
      importScripts(e + '/shared-worker.js')
    : // biome-ignore lint:
      'undefined' != typeof DedicatedWorkerGlobalScope &&
      // biome-ignore lint:
      importScripts(e + '/dedicated-worker.js')
})()
