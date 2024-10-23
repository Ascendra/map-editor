import { FunctionComponent } from "react";
import { MapEditorContextProvider } from "../MapEditorContext/MapEditorContextProvider";
import { MapViewPanel } from "./MapViewPanel";
import { PlatformsPanel } from "./PlatformsPanel";

export const App: FunctionComponent = () => {
    return (
        <MapEditorContextProvider>
            <div id="top" className="panel-container horizontal">
                {/* <generic-inputs-panel></generic-inputs-panel> */}
            </div>
            <div id="left" className="panel-container vertical">
                <PlatformsPanel />
                {/* <serialized-map-panel></serialized-map-panel> */}
            </div>
            <div id="center" className="panel-container vertical">
                <MapViewPanel />
            </div>
            <div id="right" className="panel-container vertical">
                {/* <entities-panel></entities-panel> */}
                {/* <details-panel></details-panel> */}
            </div>
        </MapEditorContextProvider>
    );
};
