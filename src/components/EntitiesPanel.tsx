import { FunctionComponent } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import {
    AddEntity,
    DeleteEntity
} from "../MapEditorContext/MapEditorContextActions";
import { ListItem } from "./ListItem";

export const EntitiesPanel: FunctionComponent = () => {
    const { entityIds } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();

    const addEntity = () => {
        dispatch({
            type: AddEntity
        });
    };

    const deleteEntity = (entityId: string) => () => {
        dispatch({
            type: DeleteEntity,
            entityId: entityId
        });
    };

    return (
        <div className="entities-panel">
            <h2>Entities</h2>
            <button type="button" onClick={addEntity}>Add</button>
            <div className="list-items">
                {entityIds.map((id) => (
                    <ListItem
                        key={id}
                        itemId={id}
                        onDelete={deleteEntity(id)}
                    />
                ))}
            </div>
        </div>
    );
};
