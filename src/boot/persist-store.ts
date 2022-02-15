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
      let state: Record<string, never> | null
      function syncState () {
        if (state) {
          for (const key in state) {
            store[key] = state[key];
          }
        }
      }

      if ('getItem' in options.persist) {
        // the state is being persisted at the Local/Session Storage (client only)
        if (process.env.SERVER) {
          return;
        }
        const storage = options.persist
        state = storage.getItem(name)

        syncState()
        store.$subscribe((_, state) => {
          storage.set(name, state)
        });
      } else {
        // the state is being persisted in a Cookie
        let cookie = options.persist
        if (process.env.SERVER && 'parseSSR' in cookie) {
          cookie = cookie.parseSSR(ssrContext)
        }
        state = cookie.get(name)
        
        syncState()
        store.$subscribe((_, state) => {
          cookie.set(name, state as never, { path: '/' })
        });
      }
    }
  });
})
