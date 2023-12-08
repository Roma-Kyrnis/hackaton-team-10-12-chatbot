import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src'],
  target: 'node20',
  clean: true,
  bundle: false,
  dts: true,
  skipNodeModulesBundle: true,
  platform: 'node',
  shims: true,
  format: ['cjs'],
});
