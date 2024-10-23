import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const rootElement = document.querySelector("#root");

if (rootElement === null) {
    throw new Error(
        "Could not find element with id: 'root' when creating React root"
    );
}

const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
