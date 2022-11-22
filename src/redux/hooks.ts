import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

import type { MyState, MyDispatch } from "./types";

export const useMyDispatch = useDispatch<MyDispatch>;

export const useMySelector: TypedUseSelectorHook<MyState> = useSelector;

export const useViewMode = () => {
  return useMySelector((state: MyState) => state.mode);
}

export const useListItems = () => {
  return useMySelector((state: MyState) => state.listItems);
}