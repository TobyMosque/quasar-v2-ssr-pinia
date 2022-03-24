<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <p>demo store</p>
      <q-input label='hello' v-model="demo.hello" />
      <q-input label='message' v-model="demo.message" />
      <q-input label='temp' v-model="demo.temp" readonly />
      <q-input label='reference' v-model="demo.reference" readonly />
      <div class='q-mt-md'>
        <q-btn @click='sayHello' label='say hello' />
      </div>
      <div class='q-mt-md'>
        <q-btn @click='sayReversedHello' label='say reversed hello' />
      </div>
      <div class='q-mt-md'>
        <q-btn @click='demo.$reset()' label='reset' />
      </div>
    </div>
    <div>
      <p>module store</p>
      <q-checkbox v-model='module.check' label='check' />
      <q-checkbox v-model='module.another' label='another' />
      <q-checkbox v-model='module.both' disable label='both' />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar, uid } from 'quasar';
import { preFetch } from 'quasar/wrappers';

import usePersistedCookie from 'src/stores/persisted-cookie';
import usePersistedLocalstorage from 'src/stores/persisted-localstorage';
import usePersistedSessionstorage from 'src/stores/persisted-sessionstorage';
import { useDemo } from 'src/stores/demo';
import { useModule } from 'src/stores/module';

export default defineComponent({
  name: 'PageIndex',
  preFetch: preFetch(async ({ store }) => {
    const demo = useDemo(store);
    await new Promise((resolve) => setTimeout(resolve, 25));
    demo.temp = demo.sayReversedHello('Super Test');
  }),
  setup() {
    const $q = useQuasar()
    const demo = useDemo()
    const module = useModule()

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
      demo,
      module,
      sayHello: () => {
        $q.notify(demo.sayHello(demo.message))
      },
      sayReversedHello: () => {
        $q.notify(demo.sayReversedHello(demo.message))
      },
    }
  },
});
</script>
