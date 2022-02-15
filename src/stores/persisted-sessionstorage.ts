import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';

const usePersistedSessionStorage = defineStore('persisted-SessionStorage', {
  state: () => ({
    id: ''
  }),
  persist: SessionStorage
});

export type PersistedSessionStorageStore = ReturnType<typeof usePersistedSessionStorage>;
export type PersistedSessionStorageSOAListener = SOAListener<PersistedSessionStorageStore>;

export default usePersistedSessionStorage;
