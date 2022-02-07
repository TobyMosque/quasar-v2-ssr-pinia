import { unref } from 'vue';
import { Pinia } from 'pinia';

declare module '@quasar/app' {
  interface QSsrContext {
    state: import('vue').Ref<never> | never;
  }
}

declare module 'pinia' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  interface Pinia {
    replaceState(state: never): void;
  }
}

type SsrConfigParams = {
  pinia: Pinia;
  ssrContext: import('@quasar/app').QSsrContext | null | undefined;
};
export default function ({ pinia, ssrContext }: SsrConfigParams) {
  if (process.env.SERVER && ssrContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    ssrContext.onRendered(function () {
      // unwrapping the state for serialization
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const state = unref(ssrContext.state);
      ssrContext.state = state;
    });
  }
  if (process.env.CLIENT) {
    pinia.replaceState = function (state: never) {
      pinia.state.value = state;
    };
  }
}
