import { FunctionComponent } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { Platform } from "../models/Platform";
import { Line } from "./Canvas/Line";

type PlatformCanvasItemProps = {
    platform: Platform;
};

export const PlatformCanvasItem: FunctionComponent<PlatformCanvasItemProps> = (
    { platform }
) => {
    const { activeItem, grid } = useMapEditorContext();

    const { x, y, length } = platform;

    const isActive = activeItem === platform;

    return (
        <>
            <Line
                start={[x, y]}
                end={[x + length * grid, y]}
                color={isActive ? "#FF0000" : "#000000"}
            />
        </>
    );
};
