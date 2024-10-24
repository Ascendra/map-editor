import { FunctionComponent } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { Platform } from "../models/Platform";
import { Line } from "./Canvas/Line";
import { Rect } from "./Canvas/Rect";

type PlatformCanvasItemProps = {
    platform: Platform;
    highlight: boolean;
};

export const PlatformCanvasItem: FunctionComponent<PlatformCanvasItemProps> = (
    { platform, highlight }
) => {
    const { activeItem, padding } = useMapEditorContext();

    const { x, y, width, height } = platform;

    const isActive = activeItem === platform;

    return (
        <>
            <Line
                start={[x, y]}
                end={[x + width, y]}
                color={isActive ? "#FF0000" : "#000000"}
            />
            {highlight
                ? (
                    <Rect
                        x={x - padding}
                        y={y - padding}
                        width={width + padding * 2}
                        height={height + padding * 2}
                        lineDash={[2, 5]}
                        color="#FF0000"
                    />
                )
                : null}
        </>
    );
};
