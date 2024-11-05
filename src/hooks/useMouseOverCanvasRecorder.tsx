import { useEffect } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import { SetMouseOverCanvas } from "../MapEditorContext/MapEditorContextActions";

export const useMouseOverCanvasRecorder = () => {
    const { mapCanvasRef } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();

    useEffect(() => {
        const mouseOver = () => {
            dispatch({
                type: SetMouseOverCanvas,
                mouseOver: true
            });
        };

        const mouseOut = () => {
            dispatch({
                type: SetMouseOverCanvas,
                mouseOver: false
            });
        };

        if (mapCanvasRef !== null) {
            mapCanvasRef.addEventListener("mouseover", mouseOver);
            mapCanvasRef.addEventListener("mouseout", mouseOut);
        }

        return () => {
            if (mapCanvasRef !== null) {
                mapCanvasRef.removeEventListener("mouseover", mouseOver);
                mapCanvasRef.removeEventListener("mouseout", mouseOut);
            }
        };
    }, [mapCanvasRef]);
};
