// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { WebViewPanel } from "./panels/WebviewPanel";

const viewType = 'WebView';
const title = '随机';

export function activate(context: vscode.ExtensionContext) {
  
	const helloCommand = vscode.commands.registerCommand("hello-world.openWindow", () => {
    const panel = WebViewPanel.render(context, viewType, title);
    panel.webview.onDidReceiveMessage((data) => { 
      // 接收消息
    })
  });

	context.subscriptions.push(helloCommand);
}

// This method is called when your extension is deactivated
export function deactivate() {}
