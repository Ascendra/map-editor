import { FunctionComponent } from "react";
import { MapEditorContextProvider } from "../MapEditorContext/MapEditorContextProvider";
import { Root } from "./Root";

export const App: FunctionComponent = () => {
    return (
        <MapEditorContextProvider>
            <Root />
        </MapEditorContextProvider>
    );
};
