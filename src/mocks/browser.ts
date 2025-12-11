// ФАЙЛ, КОТОРЫЙ НУЖНО СОЗДАТЬ: src/mocks/browser.ts
// Точка входа для MSW в браузере

import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
