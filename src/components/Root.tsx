import { FunctionComponent } from "react";
import { useDocumentMapItemDropCapture } from "../hooks/useDocumentMapItemDropCapture";
import { DetailsPanel } from "./DetailsPanel";
import { MapViewPanel } from "./MapViewPanel";
import { PlatformsPanel } from "./PlatformsPanel";
import { TitlePanel } from "./TitlePanel";

export const Root: FunctionComponent = () => {
    useDocumentMapItemDropCapture();

    return (
        <>
            <div id="top" className="panel-container horizontal">
                <TitlePanel />
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
                <DetailsPanel />
            </div>
        </>
    );
};
