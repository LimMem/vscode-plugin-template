/// <reference path="../../typings.d.ts" />

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const domNode = document.querySelector('#root')!;
createRoot(domNode).render(<App />);