/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import configSsr from './ssr-config';

declare module '@quasar/app' {
  interface BootFileParams<TState> {
    store: import('pinia').Pinia;
  }
  interface PreFetchOptions<TState> {
    store: import('pinia').Pinia;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: import('pinia').Pinia;
  }
}

export default store(function ({ ssrContext }) {
  const pinia = createPinia();
  if (process.env.MODE === 'ssr') {
    configSsr({ pinia, ssrContext });
  }
  return pinia;
});
