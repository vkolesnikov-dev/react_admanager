// КОД. ФАЙЛ: src/shared/lib/utils/__tests__/formatters.test.ts (НОВЫЙ ФАЙЛ)

import { formatNumber } from "../formatters";

describe("formatNumber", () => {
  test("should format number to 2 decimal places by default", () => {
    expect(formatNumber(1234.567)).toBe("1 234.57");
  });

  test("should handle zero decimals", () => {
    expect(formatNumber(987.123, 0)).toBe("987");
  });

  test("should handle large numbers", () => {
    // В нашем простом примере мы не делаем разделитель тысяч
    expect(formatNumber(1000000.123, 1)).toBe("1 000 000.1");
  });

  test("should handle small numbers", () => {
    expect(formatNumber(0.0001, 3)).toBe("0.000");
  });
});
