import { defineStore } from 'pinia'

export const useModule = defineStore('module',{
  state: () => ({
    check: true,
    another: false,
  }),
  getters: {
    both: state => state.check && state.another
  },
})
