// ФАЙЛ: src/app/providers/index.ts

import { WithStore } from "./with-store";
import { WithMocks } from "./with-mocks";

// ПОРЯДОК КРИТИЧЕСКИ ВАЖЕН: Mocks -> Store -> Router
export const withProviders = (component: () => React.ReactNode) =>
  WithMocks(
    // <--- MSW ДОЛЖЕН БЫТЬ ПЕРВЫМ
    WithStore(component)
  );
