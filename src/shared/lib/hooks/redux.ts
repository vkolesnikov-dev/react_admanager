// КОД. ФАЙЛ: src/shared/lib/hooks/redux.ts
// Кастомные типизированные хуки для Redux.

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";

// Используйте их вместо простого `useDispatch` и `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
