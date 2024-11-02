import { FunctionComponent, useMemo } from "react";
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

    const color = useMemo(() => {
        switch (type) {
            case EntityType.PlayerSpawn:
                return "#00FF00";
            case EntityType.Portal:
                return "#0000FF";
            default:
                return "#000000";
        }
    }, [type]);

    return (
        <>
            <Rect
                x={x}
                y={y}
                width={width}
                height={height}
                color={active ? "#FF0000" : color}
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
