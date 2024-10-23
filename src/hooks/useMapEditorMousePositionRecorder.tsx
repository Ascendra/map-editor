import { RefObject, useEffect } from "react";
import { useMapEditorContextDispatch } from "../MapEditorContext";
import { SetMousePosition } from "../MapEditorContext/MapEditorContextActions";
import { Vector2 } from "../models/Vector2";

export const useMapEditorMousePositionRecorder = <RefType extends HTMLElement>(
    elementRef: RefObject<RefType | null>,
    bounds: Vector2
) => {
    const dispatch = useMapEditorContextDispatch();

    const updateMousePosition = (event: MouseEvent) => {
        const { offsetX, offsetY } = event;

        const mouseX = Math.max(Math.min(offsetX, bounds[0]), 0);
        const mouseY = Math.max(Math.min(offsetY, bounds[1]), 0);

        dispatch({
            type: SetMousePosition,
            newPosition: [mouseX, mouseY]
        });
    };

    useEffect(() => {
        elementRef.current?.addEventListener("mousemove", updateMousePosition);

        return () => {
            elementRef.current?.removeEventListener(
                "mousemove",
                updateMousePosition
            );
        };
    }, [elementRef]);
};
