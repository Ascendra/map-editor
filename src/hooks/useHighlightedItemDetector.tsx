import { useEffect, useState } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { constants } from "../models/constants";
import { Nullable } from "../models/Nullable";

export const useHighlightedItemDetector = (): Nullable<string> => {
    const [highlightedItemId, setHighlightedItemId] = useState<
        Nullable<string>
    >(null);
    const { mousePosition, mapItems } = useMapEditorContext();

    useEffect(() => {
        const [mouseX, mouseY] = mousePosition;

        const { PADDING_SIZE } = constants;

        const highlightedItem = Object.values(mapItems).find(
            (item) => {
                const { x, y, width, height } = item;
                const left = x - PADDING_SIZE;
                const top = y - PADDING_SIZE;
                const right = x + width + PADDING_SIZE;
                const bottom = y + height + PADDING_SIZE;

                return mouseX >= left && mouseX <= right && mouseY >= top
                    && mouseY <= bottom;
            }
        );

        if (highlightedItem !== undefined) {
            setHighlightedItemId(highlightedItem.id);
        } else {
            setHighlightedItemId(null);
        }
    }, [mousePosition, mapItems]);

    return highlightedItemId;
};
