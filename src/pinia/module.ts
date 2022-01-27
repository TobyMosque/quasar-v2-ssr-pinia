import { defineStore } from 'pinia'

interface State {
  check: boolean
  another: boolean
}

// useStore could be anything like useUser, useCart
export default defineStore({
  // unique id of the store across your application
  id: 'bar',
  state: (): State => ({
    check: true,
    another: false,
  }),
  getters: {
    both: (state: State) => state.check && state.another
  },
  actions: {
    toggleCheck() {
      this.check = !this.check
    },
  }
})
