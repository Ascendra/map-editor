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
import { asserts } from "../utilities/asserts";
import { CSX } from "../utilities/CSX";
import { isEntity } from "../utilities/isEntity";
import { isPlatform } from "../utilities/isPlatform";
import { Canvas } from "./Canvas/Canvas";
import { EntityCanvasItem } from "./Canvas/EntityCanvasItem";
import { PlatformCanvasItem } from "./Canvas/PlatformCanvasItem";
import { MousePositionOverlay } from "./MousePositionOverlay";

export const MapViewPanel: FunctionComponent = () => {
    const {
        height,
        width,
        platformIds,
        entityIds,
        grabbedItemId,
        mapItems,
        activeItemId
    } = useMapEditorContext();
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

    const clearActiveItem = () => {
        if (highlightedItemId === null) {
            dispatch({
                type: SetActiveItemId,
                newItemId: null
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
            onClick={clearActiveItem}
        >
            <MousePositionOverlay>
                <Canvas height={height} width={width} ref={canvasRef}>
                    {platformIds.map((id) => {
                        asserts(isPlatform(mapItems[id]));
                        return (
                            <PlatformCanvasItem
                                key={id}
                                platform={mapItems[id]}
                                highlight={highlightedItemId === id}
                                active={activeItemId === id}
                            />
                        );
                    })}
                    {entityIds.map((id) => {
                        asserts(isEntity(mapItems[id]));
                        return (
                            <EntityCanvasItem
                                key={id}
                                entity={mapItems[id]}
                                highlight={highlightedItemId === id}
                                active={activeItemId === id}
                            />
                        );
                    })}
                </Canvas>
            </MousePositionOverlay>
        </div>
    );
};
