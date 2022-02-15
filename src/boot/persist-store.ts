import { boot } from 'quasar/wrappers'
import { Cookies, SessionStorage, LocalStorage } from 'quasar'

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export interface DefineStoreOptionsBase<S, Store> {
    // allow defining a number of ms for any of the actions
    persist?: Cookies | SessionStorage | LocalStorage;
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ store, ssrContext }) => {
  store.use(({ store, options }) => {
    if (options.persist) {
      const name = store.$id;
      const isLocal = 'getItem' in options.persist
      if (process.env.SERVER && isLocal) {
        return;
      }
      if (process.env.SERVER && 'parseSSR' in options.persist) {
        options.persist = options.persist.parseSSR(ssrContext)
      }
      
      const state: Record<string, never> | null = 'getItem' in options.persist
        ? options.persist.getItem(name)
        : options.persist.get(name);
      
      if (state) {
        for (const key in state) {
          store[key] = state[key];
        }
      }

      // for some reason, #subscribe isn't working at the server side...
      store.$subscribe((_, state) => {
        if (!options.persist) {
          return;
        }
        if ('getItem' in options.persist) {
          options.persist.set(name, state)
        } else {
          options.persist.set(name, state as never, { path: '/' })
        }
      });
    }
  });
})
