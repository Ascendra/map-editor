import { MapItemType } from "./MapItemType";

export interface MapItem {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    id: string;
    mapItemType: MapItemType;
}
