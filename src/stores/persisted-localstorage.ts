import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';

const usePersistedLocalStorage = defineStore('persisted-localstorage', {
  state: () => ({
    id: ''
  }),
  persist: LocalStorage
});

export type PersistedLocalStorageStore = ReturnType<typeof usePersistedLocalStorage>;
export type PersistedLocalStorageSOAListener = SOAListener<PersistedLocalStorageStore>;

export default usePersistedLocalStorage;
