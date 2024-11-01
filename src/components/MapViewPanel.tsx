import {
    FunctionComponent,
    MouseEvent as ReactMouseEvent,
    useRef
} from "react";
import { useHighlightedItemDetector } from "../hooks/useHighlightedItemDetector";
import { useMapEditorMousePositionRecorder } from "../hooks/useMapEditorMousePositionRecorder";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import {
    SetActiveItemId,
    SetGrabbedMapItemId,
    SetMapItemPosition
} from "../MapEditorContext/MapEditorContextActions";
import { Nullable } from "../models/Nullable";
import { CSX } from "../utilities/CSX";
import { Canvas } from "./Canvas/Canvas";
import { PlatformCanvasItem } from "./Canvas/PlatformCanvasItem";
import { MousePositionOverlay } from "./MousePositionOverlay";

export const MapViewPanel: FunctionComponent = () => {
    const { height, width, platformIds, grabbedItemId, mapItems } =
        useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();
    const canvasRef = useRef<Nullable<HTMLCanvasElement>>(null);

    useMapEditorMousePositionRecorder(canvasRef, [width, height]);

    const highlightedItemId = useHighlightedItemDetector();

    const pickUpMapItem = () => {
        if (highlightedItemId !== null) {
            dispatch({
                type: SetActiveItemId,
                newItemId: highlightedItemId
            });

            dispatch({
                type: SetGrabbedMapItemId,
                newItemId: highlightedItemId
            });
        }
    };

    const dragMapItem = (
        event: ReactMouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (grabbedItemId !== null) {
            const { movementX, movementY } = event;
            const { x, y } = mapItems[grabbedItemId];

            dispatch({
                type: SetMapItemPosition,
                itemId: grabbedItemId,
                newPosition: [x + movementX, y + movementY]
            });
        }
    };

    return (
        <div
            className={CSX({
                "map-view-panel": true,
                "pointer": highlightedItemId !== null
            })}
            onMouseDown={pickUpMapItem}
            onMouseMove={dragMapItem}
        >
            <MousePositionOverlay>
                <Canvas height={height} width={width} ref={canvasRef}>
                    {platformIds.map((id) => (
                        <PlatformCanvasItem
                            key={mapItems[id].label}
                            platformId={id}
                            highlight={highlightedItemId === id}
                        />
                    ))}
                </Canvas>
            </MousePositionOverlay>
        </div>
    );
};
