import { useEffect } from "react";
import { useMapEditorContextDispatch } from "../MapEditorContext";
import { SetGrabbedMapItemId } from "../MapEditorContext/MapEditorContextActions";

export const useDocumentMapItemDropCapture = () => {
    const dispatch = useMapEditorContextDispatch();

    useEffect(() => {
        const dropGrabbedMapItem = () => {
            dispatch({
                type: SetGrabbedMapItemId,
                newItemId: null
            });
        };

        document.addEventListener("mouseup", dropGrabbedMapItem);

        return () => {
            document.removeEventListener("mouseup", dropGrabbedMapItem);
        };
    }, [dispatch]);
};
