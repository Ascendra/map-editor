import { useEffect, useState } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { constants } from "../models/constants";
import { Nullable } from "../models/Nullable";

export const useHighlightedItemDetector = (): Nullable<string> => {
    const [highlightedItemId, setHighlightedItemId] = useState<
        Nullable<string>
    >(null);
    const { mousePosition, platformIds, mapItems } = useMapEditorContext();

    useEffect(() => {
        const [mouseX, mouseY] = mousePosition;

        const { PADDING_SIZE } = constants;

        const highlightedPlatformId = platformIds.find(
            (id) => {
                const { x, y, width, height } = mapItems[id];
                const left = x - PADDING_SIZE;
                const top = y - PADDING_SIZE;
                const right = x + width + PADDING_SIZE;
                const bottom = y + height + PADDING_SIZE;

                return mouseX >= left && mouseX <= right && mouseY >= top
                    && mouseY <= bottom;
            }
        );

        if (highlightedPlatformId !== undefined) {
            setHighlightedItemId(highlightedPlatformId);
        } else {
            setHighlightedItemId(null);
        }
    }, [mousePosition, platformIds, mapItems]);

    return highlightedItemId;
};
