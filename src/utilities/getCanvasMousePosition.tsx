import { Nullable } from "../models/Nullable";
import { Vector2 } from "../models/Vector2";

export const getCanvasMousePosition = (
    mousePosition: Vector2,
    bounds: [Vector2, Vector2],
    canvasRef: Nullable<HTMLCanvasElement>
): Vector2 => {
    const [mouseX, mouseY] = mousePosition;
    const [lowerX, lowerY] = bounds[0];
    const [upperX, upperY] = bounds[1];

    let offsetLeft = 0;
    let offsetTop = 0;
    if (canvasRef !== null) {
        offsetLeft = canvasRef.offsetLeft;
        offsetTop = canvasRef.offsetTop;
    }

    let scrollLeft = 0;
    let scrollTop = 0;
    if (canvasRef !== null && canvasRef.parentElement !== null) {
        scrollLeft = canvasRef.parentElement.scrollLeft;
        scrollTop = canvasRef.parentElement.scrollTop;
    }

    const canvasMouseX = Math.max(
        Math.min(mouseX - offsetLeft + scrollLeft, upperX),
        lowerX
    );
    const canvasMouseY = Math.max(
        Math.min(mouseY - offsetTop + scrollTop, upperY),
        lowerY
    );

    return [canvasMouseX, canvasMouseY];
};
