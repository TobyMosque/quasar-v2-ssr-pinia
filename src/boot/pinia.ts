import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'

declare module '@quasar/app' {
  interface QSsrContext {
    _onRenderedList: (() => void)[],
    onRendered (fn: () => void): void,
    piniaState?: string
    nonce?: string
  }
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, store: di, ssrContext }) => {
  const pinia = createPinia()
  app.use(pinia)
  // yes, I'm vuex as a di container
  di.provider('pinia', pinia)

  if (process.env.MODE !== 'ssr') {
    return
  }
  if (process.env.SERVER && ssrContext) {
    // temporary workaround, onRendered will be part of the QSsrContext in the future
    if (!ssrContext.onRendered) {
      ssrContext.onRendered = function (fn) {
        ssrContext._onRenderedList.push(fn)
      }
    }

    const crypto = await import('crypto')
    const serialize = (await import('serialize-javascript')).default
    ssrContext.onRendered(function () {
      ssrContext.nonce = crypto.randomBytes(16).toString('base64');
      ssrContext.piniaState = serialize(pinia.state.value, { isJSON: true })
    })
  }
      
  if (process.env.CLIENT) {
    const piniaState = (window as never)['__PINIA_STATE__'] as string
    if (piniaState) {
      pinia.state.value = JSON.parse(piniaState) as never
      document.getElementById('pinia-state')?.remove();
    }
  }
})
