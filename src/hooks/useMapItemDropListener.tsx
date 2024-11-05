import { useEffect } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import { SetGrabbedMapItemId } from "../MapEditorContext/MapEditorContextActions";

export const useMapItemDropListener = () => {
    const { grabbedItemId } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();

    useEffect(() => {
        const dropGrabbedMapItem = () => {
            if (grabbedItemId !== null) {
                dispatch({
                    type: SetGrabbedMapItemId,
                    newItemId: null
                });
            }
        };

        document.addEventListener("mouseup", dropGrabbedMapItem);

        return () => {
            document.removeEventListener("mouseup", dropGrabbedMapItem);
        };
    }, [dispatch, grabbedItemId]);
};
