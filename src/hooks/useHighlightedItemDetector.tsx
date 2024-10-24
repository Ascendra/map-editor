import { useMapEditorContext } from "../MapEditorContext";
import { CanvasRenderableItem } from "../models/CanvasRenderableItem";
import { Nullable } from "../models/Nullable";

export const useHighlightedItemDetector = (): Nullable<
    CanvasRenderableItem
> => {
    const { padding, mousePosition, platforms } = useMapEditorContext();
    const [mouseX, mouseY] = mousePosition;

    const highlightedPlatform = platforms.find(({ x, y, width, height }) => {
        const left = x - padding;
        const top = y - padding;
        const right = x + width + padding;
        const bottom = y + height + padding;

        return mouseX >= left && mouseX <= right && mouseY >= top
            && mouseY <= bottom;
    });

    if (highlightedPlatform) {
        return highlightedPlatform;
    }

    return null;
};
