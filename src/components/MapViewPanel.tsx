import { FunctionComponent, useRef } from "react";
import { useHighlightedItemDetector } from "../hooks/useHighlightedItemDetector";
import { useMapEditorMousePositionRecorder } from "../hooks/useMapEditorMousePositionRecorder";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import { SetActiveItem } from "../MapEditorContext/MapEditorContextActions";
import { Nullable } from "../models/Nullable";
import { CSX } from "../utilities/CSX";
import { Canvas } from "./Canvas/Canvas";
import { MousePositionOverlay } from "./MousePositionOverlay";
import { PlatformCanvasItem } from "./PlatformCanvasItem";

export const MapViewPanel: FunctionComponent = () => {
    const { height, width, platforms } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();
    const canvasRef = useRef<Nullable<HTMLCanvasElement>>(null);

    useMapEditorMousePositionRecorder(canvasRef, [width, height]);

    const highlightedItem = useHighlightedItemDetector();

    const setHighlightedItemAsActive = () => {
        if (highlightedItem !== null) {
            dispatch({
                type: SetActiveItem,
                newItem: highlightedItem
            });
        }
    };

    return (
        <div
            className={CSX({
                "map-view-panel": true,
                "pointer": highlightedItem !== null
            })}
            onClick={setHighlightedItemAsActive}
        >
            <MousePositionOverlay>
                <Canvas height={height} width={width} ref={canvasRef}>
                    {platforms.map((platform) => (
                        <PlatformCanvasItem
                            key={platform.id}
                            platform={platform}
                            highlight={highlightedItem === platform}
                        />
                    ))}
                </Canvas>
            </MousePositionOverlay>
        </div>
    );
};
