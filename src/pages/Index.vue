<template>
  <q-page class="row items-center justify-evenly">
    <q-input v-model="msg"></q-input>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import useApp from 'src/pinia/app'
import { Pinia } from 'pinia';

export default defineComponent({
  name: 'PageIndex',
  async preFetch ({ store: di }) {
    // yes, I'm vuex as a di container
    const pinia = di.inject<Pinia>('pinia')
    const app = useApp(pinia)
    await new Promise(resolve => setTimeout(resolve, 1000))
    app.msg = app.msg.split('').reverse().join('')
  },
  setup() {
    const app = toRefs(useApp())
    return {
      msg: app.msg
    };
  }
});
</script>
