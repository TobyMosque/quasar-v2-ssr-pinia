import { defineStore } from 'pinia';
import { SessionStorage } from 'quasar';
import { SOAListener } from './index';

const usePersistedSessionStorage = defineStore('persisted-SessionStorage', {
  state: () => ({
    id: ''
  }),
  persist: SessionStorage
});

export type PersistedSessionStorageStore = ReturnType<typeof usePersistedSessionStorage>;
export type PersistedSessionStorageSOAListener = SOAListener<PersistedSessionStorageStore>;

export default usePersistedSessionStorage;
