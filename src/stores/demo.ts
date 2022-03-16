import { defineStore } from 'pinia';
import { SOAListener } from './index';

function reverseText(text: string) {
  return text.split('').reverse().join('');
}

const useDemo = defineStore('demo', {
  state: () => ({
    hello: 'Hello',
    message: 'Hello World',
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
  },
});

export type DemoStore = ReturnType<typeof useDemo>;
export type DemoSOAListener = SOAListener<DemoStore>;

export default useDemo;
