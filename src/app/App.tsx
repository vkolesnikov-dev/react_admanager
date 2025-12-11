// КОД. ФАЙЛ: src/app/App.tsx (Исправленное Обновление)
// Корневой компонент приложения. Применяет провайдеры к Root-компоненту.

import { withProviders } from "./providers";
import { Root } from "./Root";

// withProviders(Root) — это функция, которая возвращает обернутый компонент.
export const App = withProviders(Root);
