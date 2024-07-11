import { defineProject, mergeConfig } from 'vitest/config';

import configShared from './vitest-shared.config.mjs';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      testTimeout: 1e3 * 60 * 10, // 10 minutes
      include: ['**/*.ispec.ts'],
    },
  }),
);
