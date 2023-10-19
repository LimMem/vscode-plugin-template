import * as vscode from "vscode";
import { getWebviewContent } from "../utils";

export class WebViewPanel {
  public static currentPanel: WebViewPanel | undefined;
  private readonly _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];

  private constructor(readonly panel: vscode.WebviewPanel, readonly context: vscode.ExtensionContext) {
    this._panel = panel;
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    this._panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
  }

  public dispose() {
    WebViewPanel.currentPanel = undefined;

    this._panel.dispose();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  public static render(context: vscode.ExtensionContext, viewType: string, title: string) {
    if (WebViewPanel.currentPanel) {
      WebViewPanel.currentPanel._panel.reveal(vscode.ViewColumn.One);
    } else {
      const panel = vscode.window.createWebviewPanel(viewType, title, vscode.ViewColumn.One, {
        // Enable javascript in the webview
        enableScripts: true,
        // Restrict the webview to only load resources from the `out` directory
        // localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'out')]
      });

      WebViewPanel.currentPanel = new WebViewPanel(panel, context);
    }
    return WebViewPanel.currentPanel._panel;
  }

}