import { FunctionComponent, useMemo } from "react";
import { constants } from "../../models/constants";
import { Entity } from "../../models/Entity";
import { EntityType } from "../../models/EntityType";
import { MapItemCanvasHighlight } from "./MapItemCanvasHighlight";
import { Rect } from "./Rect";

type EntityCanvasItemProps = {
    entity: Entity;
    highlight: boolean;
    active: boolean;
};

export const EntityCanvasItem: FunctionComponent<EntityCanvasItemProps> = (
    { entity, highlight, active }
) => {
    const { x, y, width, height, type } = entity;

    const [borderColor, fillColor] = useMemo(() => {
        switch (type) {
            case EntityType.PlayerSpawn:
                return ["#00FF00", "#00FF000D"];
            case EntityType.Portal:
                return ["#0000FF", "#0000FF0D"];
            default:
                return ["#000000", "#0000000D"];
        }
    }, [type]);

    return (
        <>
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                borderColor={active ? constants.HIGHLIGHT_COLOR : borderColor}
                fillColor={active ? "#0000000D" : fillColor}
            />
            <MapItemCanvasHighlight
                show={highlight}
                x={x}
                y={y}
                width={width}
                height={height}
            />
        </>
    );
};
