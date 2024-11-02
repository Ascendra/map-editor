import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { useMapEditorContextDispatch } from "../MapEditorContext";
import {
    SetEntityType,
    SetMapItemLabel,
    SetMapItemPosition,
    SetMapItemSize
} from "../MapEditorContext/MapEditorContextActions";
import { Entity } from "../models/Entity";
import { EntityType } from "../models/EntityType";
import { asserts } from "../utilities/asserts";
import { isEntityType } from "../utilities/isEntityType";
import { onlyPositiveIntegers } from "../utilities/validators";
import { DetailsInput, InputType } from "./DetailsInput";
import { DetailsSelect } from "./DetailsSelect";

export type EntityDetailProps = {
    entity: Entity;
};

export const EntityDetail: FunctionComponent<EntityDetailProps> = (
    { entity }
) => {
    const dispatch = useMapEditorContextDispatch();

    const entityTypeOptions = useMemo(() => (
        Object.values(EntityType).map((value) => ({
            label: value,
            id: value
        }))
    ), []);

    const updateItem =
        (itemKey: string) =>
        (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const newValue = event.target.value;

            switch (itemKey) {
                case "label":
                    dispatch({
                        type: SetMapItemLabel,
                        itemId: entity.id,
                        newLabel: newValue
                    });
                    break;
                case "x":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: entity.id,
                        newPosition: [+newValue, entity.y]
                    });
                    break;
                case "y":
                    dispatch({
                        type: SetMapItemPosition,
                        itemId: entity.id,
                        newPosition: [entity.x, +newValue]
                    });
                    break;
                case "height":
                    dispatch({
                        type: SetMapItemSize,
                        itemId: entity.id,
                        newSize: [entity.width, +newValue]
                    });
                    break;
                case "width":
                    dispatch({
                        type: SetMapItemSize,
                        itemId: entity.id,
                        newSize: [+newValue, entity.height]
                    });
                    break;
                case "type":
                    asserts(isEntityType(newValue));
                    dispatch({
                        type: SetEntityType,
                        entityId: entity.id,
                        newType: newValue
                    });
                    break;
            }
        };

    return (
        <>
            <DetailsInput
                type={InputType.Text}
                value={entity.label}
                label="Label"
                onChange={updateItem("label")}
            />
            <DetailsInput
                type={InputType.Text}
                value={entity.x}
                label="X"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("x")}
                className="left"
            />
            <DetailsInput
                type={InputType.Text}
                value={entity.y}
                label="Y"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("y")}
                className="right"
            />
            <DetailsInput
                type={InputType.Text}
                value={entity.width}
                label="Width"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("width")}
                className="left"
            />
            <DetailsInput
                type={InputType.Text}
                value={entity.height}
                label="Height"
                validations={[onlyPositiveIntegers]}
                onChange={updateItem("height")}
                className="right"
            />
            <DetailsSelect
                options={entityTypeOptions}
                value={entity.type}
                label="Type"
                onChange={updateItem("type")}
            />
        </>
    );
};
