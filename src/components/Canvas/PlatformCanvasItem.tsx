import { FunctionComponent } from "react";
import { useMapEditorContext } from "../../MapEditorContext";
import { PADDING_SIZE } from "../../models/constants";
import { Platform } from "../../models/Platform";
import { Line } from "./Line";
import { MapItemCanvasHighlight } from "./MapItemCanvasHighlight";

type PlatformCanvasItemProps = {
    platform: Platform;
    highlight: boolean;
};

export const PlatformCanvasItem: FunctionComponent<PlatformCanvasItemProps> = (
    { platform, highlight }
) => {
    const { activeItem } = useMapEditorContext();

    const { x, y, width, height } = platform;

    const isActive = activeItem === platform;

    return (
        <>
            <Line
                start={[x, y]}
                end={[x + width, y]}
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
