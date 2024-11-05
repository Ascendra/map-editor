import {
    FunctionComponent,
    MouseEvent as ReactMouseEvent,
    useEffect,
    useRef
} from "react";
import { useHighlightedItemDetector } from "../hooks/useHighlightedItemDetector";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import {
    SetActiveItemId,
    SetGrabbedMapItemId,
    SetMapCanvasRef,
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

export const MapViewPanel: FunctionComponent = () => {
    const {
        height,
        width,
        platformIds,
        entityIds,
        grabbedItemId,
        mapItems,
        activeItemId,
        mousePosition,
        initialDragPoint
    } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();
    const canvasRef = useRef<Nullable<HTMLCanvasElement>>(null);

    const highlightedItemId = useHighlightedItemDetector();

    useEffect(() => {
        dispatch({
            type: SetMapCanvasRef,
            newRef: canvasRef.current
        });
    }, [canvasRef]);

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
        if (grabbedItemId !== null && initialDragPoint !== null) {
            const movementX = mousePosition[0] - initialDragPoint.mouse[0];
            const movementY = mousePosition[1] - initialDragPoint.mouse[1];

            dispatch({
                type: SetMapItemPosition,
                itemId: grabbedItemId,
                newPosition: [
                    initialDragPoint.item[0] + movementX,
                    initialDragPoint.item[1] + movementY
                ]
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
        </div>
    );
};
