// КОД. ФАЙЛ: src/app/providers/with-router.tsx
// HOC для подключения роутинга.

import { RouterProvider } from "react-router-dom";
import { router } from "../router";

export const WithRouter = () => <RouterProvider router={router} />;
