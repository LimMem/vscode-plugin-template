import { Uri, Webview } from "vscode";
import getTemplate from "../template";

export function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getUri(webview: Webview, extensionUri: Uri, pathList: string[]) {
  return webview.asWebviewUri(Uri.joinPath(extensionUri, ...pathList));
}

export const getWebviewContent = (webview: Webview, extensionUri: Uri) => {
  const webviewUri = getUri(webview, extensionUri, ["out", 'webview', "index.js"]);
  const nonce = getNonce();

  return getTemplate({ webviewUri, nonce });
}

