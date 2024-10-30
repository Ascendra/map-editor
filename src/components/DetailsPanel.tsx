import { act, ChangeEvent, FunctionComponent } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import { SetMapItemPosition } from "../MapEditorContext/MapEditorContextActions";
import { DetailsInput, InputType } from "./DetailsInput";

export const DetailsPanel: FunctionComponent = () => {
    const { activeItemId, mapItems } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();

    if (activeItemId === null) {
        return (
            <div className="platforms-panel">
                <h2>Details</h2>
            </div>
        );
    }

    const item = mapItems[activeItemId];

    const updateItem =
        (itemKey: string) => (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = +event.target.value;

            switch (itemKey) {
                case "x":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: activeItemId,
                        newPosition: [newValue, item.y]
                    });
                    break;
                case "y":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: activeItemId,
                        newPosition: [item.x, newValue]
                    });
                    break;
            }
        };

    return (
        <div className="platforms-panel">
            <h2>Details</h2>
            <DetailsInput
                type={InputType.Text}
                value={item.x}
                label="x"
                onChange={updateItem("x")}
            />
            <DetailsInput
                type={InputType.Text}
                value={item.y}
                label="y"
                onChange={updateItem("y")}
            />
        </div>
    );
};
