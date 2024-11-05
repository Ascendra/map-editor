import { FunctionComponent } from "react";
import { useContext2d } from "../../hooks/useContext2d";

export type RectProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    lineDash?: number[];
    borderColor?: string;
    fillColor?: string;
};

export const Rect: FunctionComponent<RectProps> = (
    {
        x,
        y,
        width,
        height,
        lineDash = [],
        borderColor = "#000000",
        fillColor = "rgba(0, 0, 0, 0)"
    }
) => {
    const context = useContext2d();

    if (context !== null) {
        context.beginPath();
        context.rect(x, y, width, height);
        context.strokeStyle = borderColor;
        context.setLineDash(lineDash);
        context.lineWidth = 1;
        context.stroke();
        context.fillStyle = fillColor;
        context.fill();
    }

    return null;
};
