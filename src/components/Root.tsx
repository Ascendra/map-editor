import { FunctionComponent, useRef } from "react";
import { useMapItemDropListener } from "../hooks/useMapItemDropListener";
import { useMouseOverCanvasRecorder } from "../hooks/useMouseOverCanvasRecorder";
import { useMousePositionRecorder } from "../hooks/useMousePositionRecorder";
import { useMapEditorContext } from "../MapEditorContext";
import { CSX } from "../utilities/CSX";
import { DetailsPanel } from "./DetailsPanel";
import { EntitiesPanel } from "./EntitiesPanel";
import { MapViewPanel } from "./MapViewPanel";
import { MetadataPanel } from "./MetadataPanel";
import { PlatformsPanel } from "./PlatformsPanel";
import { SerializationPanel } from "./SerializationPanel";
import { TitlePanel } from "./TitlePanel";

export const Root: FunctionComponent = () => {
    const rootRef = useRef<HTMLDivElement>(null);
    const { grabbedItemId } = useMapEditorContext();

    useMapItemDropListener();
    useMousePositionRecorder();
    useMouseOverCanvasRecorder();

    return (
        <div
            id="root"
            className={CSX({
                "dragging": grabbedItemId !== null
            })}
            ref={rootRef}
        >
            <div id="top" className="panel-container horizontal">
                <TitlePanel />
            </div>
            <div id="left" className="panel-container vertical">
                <PlatformsPanel />
                <EntitiesPanel />
            </div>
            <div id="center" className="panel-container vertical">
                <MapViewPanel />
            </div>
            <div id="bottom" className="panel-container horizontal">
                <MetadataPanel />
            </div>
            <div id="right" className="panel-container vertical">
                <DetailsPanel />
                <SerializationPanel />
            </div>
        </div>
    );
};
