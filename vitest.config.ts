import { fileURLToPath } from 'node:url'
import { defineConfig, configDefaults, } from 'vitest/config'
import viteBaseConfig from './vite.base.config'

export default defineConfig({
  ...viteBaseConfig('test'),
    test: {
      globals:true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: './src/__test__/setupTest.ts',
    }
}
)
