/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from 'quasar/wrappers';
import { createPinia, Pinia } from 'pinia';
import configSsr from './ssr-config';

declare module '@quasar/app' {
  interface BootFileParams<TState> {
    store: Pinia;
  }
  interface PreFetchOptions<TState> {
    store: Pinia;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: import('pinia').Pinia;
  }
}

/* if you aren't taggeting SSR, u can remove anything what is related to the SSR mode
 * 1 - ssrContext parameter from the store wrapper
 * 2 - the import and the call to the configSrr method
 * 3 - you can even remove the file `/ssr.config.ts`
 *
 * export default store(function (_) {
 *   const pinia = createPinia();
 *   return pinia;
 * });
 */
export default store(function ({ ssrContext }) {
  const pinia = createPinia();
  if (process.env.MODE === 'ssr') {
    configSsr({ pinia, ssrContext });
  }
  return pinia;
});
