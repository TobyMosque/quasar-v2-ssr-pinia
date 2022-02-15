<template>
  <q-page class="row items-center justify-evenly">
    <q-input v-model="temp"></q-input>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { preFetch } from 'quasar/wrappers';
import useDemo from 'src/stores/demo';
import usePersistedCookie from 'src/stores/persisted-cookie';
import usePersistedLocalstorage from 'src/stores/persisted-localstorage';
import usePersistedSessionstorage from 'src/stores/persisted-sessionstorage';
import { uid } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  preFetch: preFetch(async ({ store }) => {
    const demo = useDemo(store);
    await new Promise((resolve) => setTimeout(resolve, 25));
    demo.temp = demo.sayReversedHello('Super Test');
  }),
  setup() {
    const demo = toRefs(useDemo());

    /**
     * BEGIN: Test Persistence
     */
    const persistedCookie = usePersistedCookie();
    const persistedLocalstorage = usePersistedLocalstorage();
    const persistedSessionstorage = usePersistedSessionstorage();

    if (process.env.CLIENT) {
      if (!persistedCookie.id) {
        persistedCookie.id = uid()
      }
      if (!persistedLocalstorage.id) {
        persistedLocalstorage.id = uid()
      }
      if (!persistedSessionstorage.id) {
        persistedSessionstorage.id = uid()
      }
    }

    // once that values be setted at the client, them would be immutable...
    console.log('persist: ', {
      // that value (cookie) would be accessible from the server and the client
      cookie: persistedCookie.id, 
      // that values (local and session storage) would be '' at the server
      localstorage: persistedLocalstorage.id, 
      sessionstorage: persistedSessionstorage.id // at the server, this values would be ''
    })
    /**
     * END: Test Persistence
     */

    return {
      temp: demo.temp,
    };
  },
});
</script>
