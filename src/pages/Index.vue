<template>
  <q-page class="row items-center justify-evenly">
    <div>
      <q-input label='msg' v-model="msg"></q-input>
      <q-input label='msg1' v-model="msg1"></q-input>
      <q-input label='gsm' v-model="gsm" readonly></q-input>
      <q-input label='reference' v-model="reference" readonly></q-input>
      <q-btn @click='reset' label='reset' />
    </div>
    <div>
      <q-checkbox v-model='check' label='check' />
      <q-checkbox v-model='another' label='another' />
      <q-checkbox v-model='both' disable label='both' />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { Pinia } from 'pinia'
import useApp from 'src/pinia/app'
import useModule from 'src/pinia/module'

export default defineComponent({
  name: 'PageIndex',
  async preFetch ({ store }) {
    const pinia = store as Pinia
    const app = useApp(pinia)
    await new Promise(resolve => setTimeout(resolve, 25))
    app.reverseMessage()
  },
  setup() {
    const app = toRefs(useApp())
    const module = toRefs(useModule())
    return {
      msg: app.msg,
      msg1: app.msg1,
      gsm: app.gsm,
      reference: app.reference,
      reset: app.$reset,
      check: module.check,
      another: module.another,
      both: module.both,
    };
  }
});
</script>
