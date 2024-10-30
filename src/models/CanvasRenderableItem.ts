import { MapItemType } from "./MapItemType";

export interface CanvasRenderableItem {
    x: number;
    y: number;
    width: number;
    height: number;
    label: string;
    id: string;
    type: MapItemType;
}
