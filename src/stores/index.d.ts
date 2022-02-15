// eslint-disable-next-line @typescript-eslint/no-unused-vars
type SOAListener<S> = S extends import('pinia').Store<
  infer Id,
  infer G,
  infer S,
  infer A
>
  ? import('pinia').StoreOnActionListener<Id, G, S, A>
  : null;
