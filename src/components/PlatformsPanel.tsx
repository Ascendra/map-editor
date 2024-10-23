import { FunctionComponent } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import {
    AddPlatform,
    DeletePlatform
} from "../MapEditorContext/MapEditorContextActions";
import { Platform } from "../models/Platform";
import { ListItem } from "./ListItem";

export const PlatformsPanel: FunctionComponent = () => {
    const { platforms } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();

    const addPlatform = () => {
        dispatch({
            type: AddPlatform
        });
    };

    const deletePlatform = (platform: Platform) => () => {
        dispatch({
            type: DeletePlatform,
            targetPlatform: platform
        });
    };

    return (
        <div className="platforms-panel">
            <h2>Platforms</h2>
            <button type="button" onClick={addPlatform}>Add</button>
            <div className="list-items">
                {platforms.map((platform) => (
                    <ListItem
                        key={platform.id}
                        item={platform}
                        onDelete={deletePlatform(platform)}
                    />
                ))}
            </div>
        </div>
    );
};
