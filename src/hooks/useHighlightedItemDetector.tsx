import { useEffect, useState } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { constants } from "../models/constants";
import { Nullable } from "../models/Nullable";
import { getCanvasMousePosition } from "../utilities/getCanvasMousePosition";

export const useHighlightedItemDetector = (): Nullable<string> => {
    const [highlightedItemId, setHighlightedItemId] = useState<
        Nullable<string>
    >(null);
    const {
        mousePosition,
        mapItems,
        mapCanvasRef,
        width,
        height,
        mouseOverCanvas
    } = useMapEditorContext();

    useEffect(() => {
        if (mapCanvasRef !== null && mouseOverCanvas) {
            const [mouseX, mouseY] = getCanvasMousePosition(mousePosition, [
                [0, 0],
                [width, height]
            ], mapCanvasRef);

            const { PADDING_SIZE } = constants;

            const highlightedItem = Object.values(mapItems).find(
                (item) => {
                    const { x, y, width, height } = item;
                    const left = x - PADDING_SIZE;
                    const top = y - PADDING_SIZE;
                    const right = x + width + PADDING_SIZE;
                    const bottom = y + height + PADDING_SIZE;

                    return mouseX >= left && mouseX <= right
                        && mouseY >= top
                        && mouseY <= bottom;
                }
            );

            if (highlightedItem !== undefined) {
                setHighlightedItemId(highlightedItem.id);
            } else {
                setHighlightedItemId(null);
            }
        } else {
            setHighlightedItemId(null);
        }
    }, [mousePosition, mapItems, mapCanvasRef]);

    return highlightedItemId;
};
