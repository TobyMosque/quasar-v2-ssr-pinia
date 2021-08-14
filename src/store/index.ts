import { store } from 'quasar/wrappers'
import { createPinia, Pinia } from 'pinia'
import { unref, Ref } from 'vue'
// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

declare module '@quasar/app' {
  interface QSsrContext {
    state: Ref<never> | never
  }
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Pinia
  }
}

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface Pinia {
    replaceState (state: never): void
  }
}

export default store(function ({ ssrContext }) {
  const pinia = createPinia()
  if (process.env.SERVER && ssrContext) {
    ssrContext.onRendered(function () {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      ssrContext.state = unref(ssrContext.state)
    })
  }
  if (process.env.CLIENT) {
    pinia.replaceState = function (state: never) {
      pinia.state.value = state
    }
  }
  return pinia
})
