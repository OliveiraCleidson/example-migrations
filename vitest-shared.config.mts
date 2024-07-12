import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const coverageFilesWhitelist = [
  '**/infra/config/env-schema-config.ts',
  '**/**.factory.ts',
  '**/**.contract.ts',
  '**/main.ts',
  '**/drizzle-orm/**/*.**',
];

export default defineConfig({
  test: {
    setupFiles: ['./setup-test.ts'],
    globals: true,
    root: './',
    exclude: ['node_modules', 'dist', 'docker', '.git'],
    passWithNoTests: true,
    includeSource: ['src/**/*.ts'],
    coverage: {
      reportOnFailure: true,
      enabled: false,
      provider: 'v8',
      reportsDirectory: '__coverage__',
      reporter: ['html'],
      all: true,
      clean: true,
      cleanOnRerun: true,
      include: ['src/**/*.ts'],
      exclude: ['src/**/index.ts', ...coverageFilesWhitelist],
      thresholds: {
        branches: 80,
        statements: 50,
        functions: 70,
        perFile: false,
      },
    },
  },
  esbuild: false,
  plugins: [
    swc.vite({
      // Serve para pegar desabilitar e pegar o '.swcrc' do projeto
      tsconfigFile: true,
      module: { type: 'es6' },
      include: ['src/**/*.ts'],
    }),
    tsConfigPaths(),
  ],
});
