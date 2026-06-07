import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://kinepourtous.vercel.app',
  output: 'hybrid',
  adapter: vercel(),
});
