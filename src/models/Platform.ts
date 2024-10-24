import { CanvasRenderableItem } from "./CanvasRenderableItem";

export type Platform = CanvasRenderableItem & {
    length: number;
    spawnPointsCount: number;
};
