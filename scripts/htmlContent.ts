import chalk from 'chalk';
import { existsSync, mkdirSync, readFileSync, watchFile, writeFileSync } from 'fs';
import { join } from 'path';
import type { Compiler } from 'webpack';


interface HtmlContentPluginOptions {
  title: string,
  template: string,
  filename: string,
  publicPath: string,
}

const PLUGIN_NAME = 'HtmlContentPlugin';


class HtmlContentPlugin {
  
  compiler?: Compiler; 
  constructor(readonly options: HtmlContentPluginOptions) { }

  parseHTML() { 
    const { title, template, filename = 'template.js', publicPath } = this.options
    const tpl = readFileSync(template, { encoding: 'utf-8' });
    const saveToPath = join(process.cwd(), publicPath);

    if (!existsSync(saveToPath)) {
      mkdirSync(saveToPath, { recursive: true });
    }

    writeFileSync(join(saveToPath, filename), `
import { Uri } from "vscode";
export default function ({ webviewUri, nonce }: { webviewUri: Uri, nonce: string }) {
  var title = '${title}';
  return \`
    ${tpl}
  \`;
}
`);
  }

  apply(compiler: Compiler) {
    this.compiler = compiler;
    compiler.hooks.initialize.tap(PLUGIN_NAME, this.parseHTML.bind(this));
    if (existsSync(this.options.template)) {
      watchFile(this.options.template, this.parseHTML.bind(this))
    }
  }
}

export default HtmlContentPlugin;