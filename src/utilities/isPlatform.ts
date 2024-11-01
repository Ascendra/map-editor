import { MapItem } from "../models/MapItem";
import { MapItemType } from "../models/MapItemType";
import { Platform } from "../models/Platform";

export function isPlatform(
    item: MapItem
): item is Platform {
    return item.mapItemType === MapItemType.Platform;
}
