import { defineStore } from 'pinia'
import useModule from 'src/pinia/module'

interface State {
  msg: string
  msg1: string
}

// useStore could be anything like useUser, useCart
export default defineStore({
  // unique id of the store across your application
  id: 'foo',
  state: (): State => ({
      msg: 'Hello World',
      msg1: 'some string',
  }),
  getters: {
    gsm: (state: State) => state.msg1.split('').reverse().join(''),
    reference: (state: State) => {
      const module = useModule()
      return module.both ? `they both, ${state.msg}` : `not both, ${state.msg1}`
    }
  },
  actions: {
    reverseMessage() {
      this.msg = this.msg.split('').reverse().join('')
    },
  }
})
