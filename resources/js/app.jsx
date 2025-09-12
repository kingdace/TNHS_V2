import "../css/app.css";
import "./bootstrap";

import { createRoot, hydrateRoot } from "react-dom/client";
import React from "react";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Use React Router for all routes
const el = document.getElementById("app");
if (el) {
    // Clear any existing content to avoid conflicts
    el.innerHTML = "";

    // Use a single root instance to avoid conflicts
    if (!window.reactRoot) {
        window.reactRoot = createRoot(el);
    }

    // Import and render the App component immediately
    import("./components/App.jsx").then(({ default: App }) => {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App />);
        } else {
            window.reactRoot.render(<App />);
        }
    });
}
