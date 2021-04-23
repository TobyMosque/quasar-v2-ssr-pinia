import { store } from 'quasar/wrappers'
import { createStore, Store as VuexStore } from 'vuex'

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

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<never>
  }
}

declare module 'vuex' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface Store<S> {
    provider <T>(name: string, service: T): void
    inject <T>(name: string): T | undefined
  }
}

export default store(function (/* { ssrContext } */) {
  const Store = createStore<never>({
    strict: !!process.env.DEBUGGING
  })

  // yes, I'm vuex as a di container
  const depedencies: Record<string, unknown> = {}
  Store.provider = function <T>(name: string, service: T) {
    depedencies[name] = service
  }
  Store.inject = function <T>(name: string) {
    if (name in depedencies) {
      const service = depedencies[name]
      return service as T
    }
  }
  return Store
})
