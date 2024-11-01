import { FunctionComponent } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import {
    AddPlatform,
    DeletePlatform
} from "../MapEditorContext/MapEditorContextActions";
import { ListItem } from "./ListItem";

export const PlatformsPanel: FunctionComponent = () => {
    const { platformIds, mapItems } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();

    const addPlatform = () => {
        dispatch({
            type: AddPlatform
        });
    };

    const deletePlatform = (platformId: string) => () => {
        dispatch({
            type: DeletePlatform,
            targetPlatformId: platformId
        });
    };

    return (
        <div className="platforms-panel">
            <h2>Platforms</h2>
            <button type="button" onClick={addPlatform}>Add</button>
            <div className="list-items">
                {platformIds.map((id) => (
                    <ListItem
                        key={id}
                        itemId={id}
                        onDelete={deletePlatform(id)}
                    />
                ))}
            </div>
        </div>
    );
};
