import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

const entryPointElement = document.querySelector("#react-entry-point");

if (entryPointElement === null) {
    throw new Error(
        "Could not find element with id: 'react-entry-point' when creating React root"
    );
}

const root = createRoot(entryPointElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
