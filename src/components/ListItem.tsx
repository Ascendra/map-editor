import { FunctionComponent, MouseEvent } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import { SetActiveItemId } from "../MapEditorContext/MapEditorContextActions";
import { CSX } from "../utilities/CSX";

type ListItemProps = {
    itemId: string;
    onDelete: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const ListItem: FunctionComponent<ListItemProps> = (
    { itemId, onDelete }
) => {
    const dispatch = useMapEditorContextDispatch();
    const { activeItemId, mapItems } = useMapEditorContext();

    const setActive = () => {
        dispatch({
            type: SetActiveItemId,
            newItemId: itemId
        });
    };

    const { label } = mapItems[itemId];

    return (
        <div
            onClick={setActive}
            className={CSX({
                "list-item": true,
                "active": activeItemId === itemId
            })}
        >
            <span className="label">{label}</span>
            <button
                onClick={onDelete}
                className="delete-button"
            >
                x
            </button>
        </div>
    );
};
