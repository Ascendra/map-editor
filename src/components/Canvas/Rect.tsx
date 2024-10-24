import { FunctionComponent } from "react";
import { useContext2d } from "../../hooks/useContext2d";

type RectProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    lineDash?: number[];
    color?: string;
};

export const Rect: FunctionComponent<RectProps> = (
    { x, y, width, height, lineDash, color }
) => {
    const context = useContext2d();

    if (context !== null) {
        context.beginPath();
        context.rect(x, y, width, height);
        context.strokeStyle = color || "#000000";
        context.setLineDash(lineDash || []);
        context.stroke();
    }

    return null;
};
