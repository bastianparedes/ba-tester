import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['./apps/**/__tests__/**/*.test.ts', 'src/**/*.spec.ts'],
  },
});
