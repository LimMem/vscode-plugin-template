import { defineConfig } from 'father';
import HtmlContentPlugin from './scripts/htmlContent';
import path, { join } from 'path';

const pkg = require('./package.json');

export default defineConfig({
  umd: {
    output: {
      path: "out/webview",
      filename: 'index.js'
    },
    chainWebpack(memo, args) {
      memo.plugin('html-webpack-content').use(HtmlContentPlugin, [{
        title: pkg.name,
        template: path.join(process.cwd(), 'src/document.html'),
        filename: 'template.ts',
        publicPath: 'src',
      }])
      return memo;
    },
    name: pkg.name,
    externals: [
      'vscode'
    ],
    entry: './src/webview/index.tsx',
    extractCSS: false,
    postcssOptions: {}
  },
  cjs: {
    ignores: ['**/webview/**', 'document.ejs'],
    output: 'out/',
  },
  define: {
    __VERSION__: JSON.stringify(pkg.version)
  }
});