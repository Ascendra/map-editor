import { FunctionComponent } from "react";
import { useContext2d } from "../../hooks/useContext2d";

export type RectProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    lineDash?: number[];
    color?: string;
};

export const Rect: FunctionComponent<RectProps> = (
    { x, y, width, height, lineDash = [], color = "#000000" }
) => {
    const context = useContext2d();

    if (context !== null) {
        context.beginPath();
        context.rect(x, y, width, height);
        context.strokeStyle = color;
        context.setLineDash(lineDash);
        context.lineWidth = 1;
        context.stroke();
    }

    return null;
};
