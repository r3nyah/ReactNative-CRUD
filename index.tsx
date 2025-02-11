import { registerRootComponent } from "expo";
import App from "./App";
import { createRoot } from "react-dom/client";
import React from "react";

// Ensure TypeScript recognizes the element
const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}

// Register App for Expo
registerRootComponent(App);
