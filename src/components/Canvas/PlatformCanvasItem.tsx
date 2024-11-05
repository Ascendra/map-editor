import { FunctionComponent } from "react";
import { constants } from "../../models/constants";
import { Platform } from "../../models/Platform";
import { MapItemCanvasHighlight } from "./MapItemCanvasHighlight";
import { Rect } from "./Rect";

type PlatformCanvasItemProps = {
    platform: Platform;
    highlight: boolean;
    active: boolean;
};

export const PlatformCanvasItem: FunctionComponent<PlatformCanvasItemProps> = (
    { platform, highlight, active }
) => {
    const { x, y, width, height } = platform;

    return (
        <>
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                borderColor={active ? constants.HIGHLIGHT_COLOR : "#000000"}
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
