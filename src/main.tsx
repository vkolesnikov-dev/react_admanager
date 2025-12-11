// КОД. ФАЙЛ: src/main.tsx (Обновление)
// Переименовываем импорт.

import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app/App"; // Импорт из app/App

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
