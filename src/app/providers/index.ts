// ФАЙЛ: src/app/providers/index.ts

import { WithStore } from "./with-store";
import { WithMocks } from "./with-mocks";
import { WithToast } from "./with-toast";

// ПОРЯДОК КРИТИЧЕСКИ ВАЖЕН: Mocks -> Store -> Router
export const withProviders = (component: () => React.ReactNode) =>
  WithMocks(
    // MSW ДОЛЖЕН БЫТЬ ПЕРВЫМ
    WithStore(
      // Redux Store обеспечивает доступ к хранилищу для ToastProvider
      WithToast(
        // Если у вас есть WithRouter, он должен быть здесь:
        // WithRouter(component)
        component
      )
    )
  );
