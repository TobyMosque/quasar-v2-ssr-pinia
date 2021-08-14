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
  async preFetch ({ store }) {
    const pinia = store as Pinia
    const app = useApp(pinia)
    await new Promise(resolve => setTimeout(resolve, 25))
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
