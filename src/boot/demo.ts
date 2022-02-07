import { boot } from 'quasar/wrappers'
import useDemo, { DemoStore, DemoSOAListener } from 'src/stores/demo'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ store }) => {
  const demo = useDemo(store)

  function testStore (store: DemoStore) {
    const name = 'Super Test'
    console.log({
      state: { hello: store.hello, message: store.message },
      actions: { sayHello: store.sayHello(name), x: store.sayReversedHello(name) },
      getters: store.reversedState
    })
  }

  const onAction: DemoSOAListener = ({ after, store }) => {
    after((result) => {
      console.log(result)
      testStore(store)
    })
  }

  demo.$onAction(onAction)
  testStore(demo)
})
