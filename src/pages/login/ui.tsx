// КОД. ФАЙЛ: src/pages/login/ui.tsx (Финальное Обновление для Итерации 8)

import React, { type FC } from "react";
import { LoginByEmail } from "../../features/auth/ui/LoginByEmail"; // <-- Импортируем фичу

// Страница теперь не содержит логики, только рендерит фичу.
const LoginPage: FC = () => {
  return <LoginByEmail />;
};

export default LoginPage;
