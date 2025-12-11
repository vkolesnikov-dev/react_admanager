// КОД. ФАЙЛ: src/app/Root.tsx
// Компонент, который будет обернут всеми провайдерами.

import { WithRouter } from "./providers/with-router";

export const Root = () => {
  // WithRouter содержит <RouterProvider router={router} />
  return <WithRouter />;
};
