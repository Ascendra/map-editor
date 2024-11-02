import { ChangeEvent, FunctionComponent } from "react";
import { useMapEditorContextDispatch } from "../MapEditorContext";
import {
    SetMapItemLabel,
    SetMapItemPosition,
    SetMapItemSize,
    SetPlatformSpawnCount
} from "../MapEditorContext/MapEditorContextActions";
import { Platform } from "../models/Platform";
import { onlyPositiveIntegers } from "../utilities/validators";
import { DetailsInput, InputType } from "./DetailsInput";

export type PlatformDetailProps = {
    platform: Platform;
};

export const PlatformDetail: FunctionComponent<PlatformDetailProps> = (
    { platform }
) => {
    const dispatch = useMapEditorContextDispatch();

    const updateItem =
        (itemKey: string) => (event: ChangeEvent<HTMLInputElement>) => {
            const newValue = event.target.value;

            switch (itemKey) {
                case "label":
                    dispatch({
                        type: SetMapItemLabel,
                        itemId: platform.id,
                        newLabel: newValue
                    });
                    break;
                case "x":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: platform.id,
                        newPosition: [+newValue, platform.y]
                    });
                    break;
                case "y":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: platform.id,
                        newPosition: [platform.x, +newValue]
                    });
                    break;
                case "width":
                    dispatch({
                        type: SetMapItemSize,
                        itemId: platform.id,
                        newSize: [+newValue, platform.height]
                    });
                    break;
                case "spawnPointCount":
                    dispatch({
                        type: SetPlatformSpawnCount,
                        platformId: platform.id,
                        newCount: +newValue
                    });
                    break;
            }
        };

    return (
        <>
            <DetailsInput
                type={InputType.Text}
                value={platform.label}
                label="Label"
                onChange={updateItem("label")}
            />
            <DetailsInput
                type={InputType.Text}
                value={platform.x}
                label="X"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("x")}
                className="left"
            />
            <DetailsInput
                type={InputType.Text}
                value={platform.y}
                label="Y"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("y")}
                className="right"
            />
            <DetailsInput
                type={InputType.Text}
                value={platform.width}
                label="Width"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("width")}
            />
            <DetailsInput
                type={InputType.Text}
                value={platform.spawnPointCount}
                label="Spawn Point Count"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("spawnPointCount")}
            />
        </>
    );
};
