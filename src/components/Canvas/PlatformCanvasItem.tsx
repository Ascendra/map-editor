import { FunctionComponent } from "react";
import { useMapEditorContext } from "../../MapEditorContext";
import { Line } from "./Line";
import { MapItemCanvasHighlight } from "./MapItemCanvasHighlight";
import { Rect } from "./Rect";

type PlatformCanvasItemProps = {
    platformId: string;
    highlight: boolean;
};

export const PlatformCanvasItem: FunctionComponent<PlatformCanvasItemProps> = (
    { platformId, highlight }
) => {
    const { mapItems, activeItemId } = useMapEditorContext();

    const { x, y, width, height } = mapItems[platformId];

    const isActive = activeItemId === platformId;

    return (
        <>
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                color={isActive ? "#FF0000" : "#000000"}
            />
            <MapItemCanvasHighlight
                show={highlight}
                x={x}
                y={y}
                width={width}
                height={height}
            />
        </>
    );
};
