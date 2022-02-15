import { boot } from 'quasar/wrappers';
import { useDemo, DemoStore, DemoSOAListener } from 'src/stores/demo';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ store }) => {
  const demo = useDemo(store);

  function testStore(store: DemoStore) {
    console.log('test store', {
      state: { hello: store.hello, message: store.message },
      getters: store.reversedState,
    });
  }

  const onAction: DemoSOAListener = ({ after, store }) => {
    after((result) => {
      console.log('StoreOnActionListener', { result });
      testStore(store);
    });
  };

  demo.$onAction(onAction);
  const name = 'Super Test';
  demo.sayReversedHello(name);
  testStore(demo);
});
