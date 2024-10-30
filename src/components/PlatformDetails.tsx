import { act, ChangeEvent, FunctionComponent } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import {
    SetMapItemPosition,
    SetPlatformLength
} from "../MapEditorContext/MapEditorContextActions";
import { Platform } from "../models/Platform";
import { DetailsInput, InputType } from "./DetailsInput";

export type PlatformDetailProps = {
    item: Platform;
};

export const PlatformDetail: FunctionComponent<PlatformDetailProps> = (
    { item }
) => {
    const dispatch = useMapEditorContextDispatch();

    const updateItem =
        (itemKey: string) => (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = +event.target.value;

            switch (itemKey) {
                case "x":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: item.id,
                        newPosition: [newValue, item.y]
                    });
                    break;
                case "y":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: item.id,
                        newPosition: [item.x, newValue]
                    });
                    break;
                case "length":
                    dispatch({
                        type: SetPlatformLength,
                        platformId: item.id,
                        newLength: newValue
                    });
                    break;
            }
        };

    return (
        <>
            <DetailsInput
                type={InputType.Text}
                value={item.x}
                label="X"
                onChange={updateItem("x")}
            />
            <DetailsInput
                type={InputType.Text}
                value={item.y}
                label="Y"
                onChange={updateItem("y")}
            />
            <DetailsInput
                type={InputType.Text}
                value={item.length}
                label="Length"
                onChange={updateItem("length")}
            />
        </>
    );
};
