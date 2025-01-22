import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'github-light-high-contrast',
    },
  },
  integrations: [
      tailwind({
          applyBaseStyles: false
      }),
      react()
  ],
  adapter: netlify(),
});
