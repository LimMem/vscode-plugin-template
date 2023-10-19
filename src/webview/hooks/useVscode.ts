import { useMemo } from "react";
import * as vscode from "vscode";

export const useVscode = () => { 
  
  const webview: vscode.Webview = useMemo(() => {
    /* @ts-ignore */
    return window.acquireVsCodeApi()
  }, [])

  return {
    webview
  };
}