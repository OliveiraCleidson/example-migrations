import { defineProject, mergeConfig } from 'vitest/config';

import configShared from './vitest-shared.config.mjs';

export default mergeConfig(
  configShared,
  defineProject({
    test: {
      include: ['**/*.spec.ts'],
    },
  }),
);
