import { FunctionComponent } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { getCanvasMousePosition } from "../utilities/getCanvasMousePosition";

export const MetadataPanel: FunctionComponent = () => {
    const { mousePosition, mapCanvasRef, width, height } =
        useMapEditorContext();

    const [mouseX, mouseY] = getCanvasMousePosition(mousePosition, [
        [0, 0],
        [width, height]
    ], mapCanvasRef);

    return (
        <div className="metadata-panel">
            <div className="map-mouse-position">
                {mouseX}, {mouseY}
            </div>
        </div>
    );
};
