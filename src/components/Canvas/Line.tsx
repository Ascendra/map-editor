import { FunctionComponent } from "react";
import { useContext2d } from "../../hooks/useContext2d";
import { Vector2 } from "../../models/Vector2";

type LineProps = {
    start: Vector2;
    end: Vector2;
    color?: string;
};

export const Line: FunctionComponent<LineProps> = ({ start, end, color }) => {
    const context = useContext2d();

    if (context !== null) {
        context.beginPath();
        context.moveTo(start[0], start[1]);
        context.lineTo(end[0], end[1]);
        context.strokeStyle = color || "#000000";
        context.stroke();
    }

    return null;
};
