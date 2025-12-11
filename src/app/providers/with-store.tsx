// КОД. ФАЙЛ: src/app/providers/with-store.tsx
// HOC для подключения Redux Store.

import React from "react";
import { Provider } from "react-redux";
import { store } from "../../shared/store/store";

export const WithStore = (component: () => React.ReactNode) => () =>
  <Provider store={store}>{component()}</Provider>;
