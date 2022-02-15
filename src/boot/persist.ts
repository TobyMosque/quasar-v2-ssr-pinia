import { boot } from 'quasar/wrappers';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

export default boot(({ store }) => {
  console.log('pinia-plugin-persistedstate')
  store.use(piniaPluginPersistedState)
})
