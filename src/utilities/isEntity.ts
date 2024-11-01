import { Entity } from "../models/Entity";
import { MapItem } from "../models/MapItem";
import { MapItemType } from "../models/MapItemType";

export function isEntity(
    item: MapItem
): item is Entity {
    return item.mapItemType === MapItemType.Entity;
}
