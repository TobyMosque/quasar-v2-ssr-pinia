import { defineStore } from 'pinia';

import { useModule } from './module';

function reverseText(text: string) {
  return text.split('').reverse().join('');
}

export const useDemo = defineStore('demo', {
  state: () => ({
    hello: 'Hello',
    message: 'World',
    temp: '',
  }),
  actions: {
    sayHello(name: string) {
      return `${this.hello} ${name}`;
    },
    sayReversedHello(name: string) {
      const eman = reverseText(name);
      return `${eman} ${this.reverseHello}`;
    },
  },
  getters: {
    reverseMessage(state) {
      return reverseText(state.message);
    },
    reverseHello(state) {
      return reverseText(state.hello);
    },
    reversedState() {
      return {
        hello: this.reverseHello,
        message: this.reverseMessage,
      };
    },
    reference(state) {
      const module = useModule()
      return module.both ? `they both, ${state.message}` : `not both, ${state.hello}`
    },
  },
});

export type DemoStore = ReturnType<typeof useDemo>;
export type DemoSOAListener = SOAListener<DemoStore>;
