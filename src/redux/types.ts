import { MyStore } from "./store";

type MyStoreType = typeof MyStore;
type MyDispatch = typeof MyStore.dispatch;
type MyState = ReturnType<typeof MyStore.getState>;

export type { MyStoreType, MyDispatch, MyState };