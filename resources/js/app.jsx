import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
    <React.StrictMode>
        <Router
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
            <App />
        </Router>
    </React.StrictMode>
);
