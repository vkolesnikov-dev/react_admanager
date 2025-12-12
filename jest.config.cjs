// КОД. ФАЙЛ: jest.config.js (В КОРНЕ ПРОЕКТА)

module.exports = {
  // Определяем, что Jest должен использовать симуляцию DOM (для компонентов React)
  testEnvironment: "jsdom",

  // Указываем, какие файлы обрабатывать с помощью ts-jest
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": [
      "ts-jest",
      {
        // Настройки для ts-jest, чтобы он использовал ваш tsconfig
        tsconfig: "tsconfig.json",
      },
    ],
  },

  // Определяем, где искать файлы тестов
  testMatch: ["**/__tests__/**/*.(spec|test).{js,jsx,ts,tsx}"],

  // Настройка для работы с импортами @/ (алиасами)
  moduleNameMapper: {
    // Алиасы должны соответствовать тем, что у вас в tsconfig.json и vite.config.ts
    // Например, если у вас есть "src/app/*": ["app/*"]
    "^app/(.*)$": "<rootDir>/src/app/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^widgets/(.*)$": "<rootDir>/src/widgets/$1",
    "^features/(.*)$": "<rootDir>/src/features/$1",
    "^entities/(.*)$": "<rootDir>/src/entities/$1",
    "^shared/(.*)$": "<rootDir>/src/shared/$1",

    // Обработка импортов CSS Modules, чтобы они не падали в тестах
    "\\.css$": "identity-obj-proxy",
  },

  // Массив путей к файлам, которые нужно запустить перед каждым тестом (например, для настройки RTL)
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],

  // Указываем расширения файлов
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
