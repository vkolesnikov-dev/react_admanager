// КОД. ФАЙЛ: src/shared/lib/utils/formatters.ts (НОВЫЙ ФАЙЛ)

/**
 * Форматирует число, округляя до заданного количества знаков после запятой.
 */
export const formatNumber = (num: number, decimals: number = 2): string => {
  // В реальном приложении здесь может быть LocaleString или Intl.NumberFormat
  return num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
