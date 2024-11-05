import { useEffect } from "react";
import { useMapEditorContextDispatch } from "../MapEditorContext";
import { SetMousePosition } from "../MapEditorContext/MapEditorContextActions";

export const useMousePositionRecorder = () => {
    const dispatch = useMapEditorContextDispatch();

    const updateMousePosition = (event: MouseEvent) => {
        const { clientX, clientY } = event;

        dispatch({
            type: SetMousePosition,
            newPosition: [clientX, clientY]
        });
    };

    useEffect(() => {
        document.addEventListener("mousemove", updateMousePosition);

        return () => {
            document.removeEventListener(
                "mousemove",
                updateMousePosition
            );
        };
    }, []);
};
