<template>
  <q-page class="row items-center justify-evenly">
    <q-input v-model="temp"></q-input>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { preFetch } from 'quasar/wrappers'
import useDemo from 'src/stores/demo'

export default defineComponent({
  name: 'PageIndex',
   preFetch: preFetch(async ({ store }) => {
    const demo = useDemo(store)
    await new Promise(resolve => setTimeout(resolve, 25))
    demo.temp = demo.sayReversedHello('Super Test')
  }),
  setup() {
    const demo = toRefs(useDemo())
    return {
      temp: demo.temp
    };
  }
});
</script>
