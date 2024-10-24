import { useEffect, useState } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { CanvasRenderableItem } from "../models/CanvasRenderableItem";
import { PADDING_SIZE } from "../models/constants";
import { Nullable } from "../models/Nullable";

export const useHighlightedItemDetector = (): Nullable<
    CanvasRenderableItem
> => {
    const [highlightedItem, setHighlightedItem] = useState<
        Nullable<CanvasRenderableItem>
    >(null);
    const { mousePosition, platforms } = useMapEditorContext();

    useEffect(() => {
        const [mouseX, mouseY] = mousePosition;

        const highlightedPlatform = platforms.find(
            ({ x, y, width, height }) => {
                const left = x - PADDING_SIZE;
                const top = y - PADDING_SIZE;
                const right = x + width + PADDING_SIZE;
                const bottom = y + height + PADDING_SIZE;

                return mouseX >= left && mouseX <= right && mouseY >= top
                    && mouseY <= bottom;
            }
        );

        if (highlightedPlatform !== undefined) {
            setHighlightedItem(highlightedPlatform);
        } else {
            setHighlightedItem(null);
        }
    }, [mousePosition, platforms]);

    return highlightedItem;
};
