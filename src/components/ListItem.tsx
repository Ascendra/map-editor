import { FunctionComponent } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import { SetActiveItem } from "../MapEditorContext/MapEditorContextActions";
import { CanvasRenderableItem } from "../models/CanvasRenderableItem";
import { CSX } from "../utilities/CSX";

type ListItemProps = {
    item: CanvasRenderableItem;
    onDelete: () => void;
};

export const ListItem: FunctionComponent<ListItemProps> = (
    { item, onDelete }
) => {
    const dispatch = useMapEditorContextDispatch();
    const mapEditorContext = useMapEditorContext();

    const setActive = () => {
        dispatch({
            type: SetActiveItem,
            newItem: item
        });
    };

    return (
        <div
            onClick={setActive}
            className={CSX({
                "list-item": true,
                "active": mapEditorContext.activeItem === item
            })}
        >
            <span className="label">{item.label}</span>
            <button
                onClick={onDelete}
                className="delete-button"
            >
                x
            </button>
        </div>
    );
};
