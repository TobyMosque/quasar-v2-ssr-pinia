import { defineStore } from 'pinia'

// useStore could be anything like useUser, useCart
export default defineStore({
  // unique id of the store across your application
  id: 'app-module',
  state() {
    return {
      msg: 'Hello World'
    }
  }
})
  