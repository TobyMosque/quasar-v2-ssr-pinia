import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { SOAListener } from './index';

const usePersistedCookie = defineStore('persisted-cookie', {
  state: () => ({
    id: ''
  }),
  persist: Cookies
});

export type PersistedCookieStore = ReturnType<typeof usePersistedCookie>;
export type PersistedCookieSOAListener = SOAListener<PersistedCookieStore>;

export default usePersistedCookie;
