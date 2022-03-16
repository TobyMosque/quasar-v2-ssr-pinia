/* eslint-disable @typescript-eslint/no-unused-vars */
import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';

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
  return pinia;
});

export type SOAListener<S> = S extends import('pinia').Store<
  infer Id,
  infer G,
  infer S,
  infer A
>
  ? import('pinia').StoreOnActionListener<Id, G, S, A>
  : null;