import { configure } from 'quasar/wrappers';
import path from 'path';

export default configure(function (/* ctx */) {
  return {
    // ...existing code...
    boot: [],
    css: ['app.scss'],
    extras: ['material-icons'],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20',
      },
      vueRouterMode: 'hash',
      distDir: 'dist/spa',
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: {
              tsconfigPath: 'tsconfig.vue-tsc.json',
            },
            eslint: {
              lintCommand: 'eslint "./**/*.{js,ts,mjs,cjs,vue}"',
            },
          },
          { server: false },
        ],
      ],
      extendViteConf(viteConf) {
        viteConf.resolve.alias = {
          ...viteConf.resolve.alias,
          '@': path.resolve(__dirname, 'src'),
        };
      },
    },
    devServer: {
      open: true,
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost:3030',
      //     changeOrigin: false, // Tenta manter a origem original para que o redirect volte para a porta correta (se permitido pelo Google)
      //   },
      // },
    },
    framework: {
      config: {},
      plugins: [],
    },
    animations: [],
    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ['render'],
    },
    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    },
    cordova: {},
    capacitor: {
      hideSplashscreen: true,
    },
    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'rota-financeira-package',
      },
    },
    bex: {
      contentScripts: ['my-content-script'],
    },
  };
});
