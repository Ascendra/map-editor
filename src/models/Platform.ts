import { CanvasRenderableItem } from "./CanvasRenderableItem";

export type Platform = CanvasRenderableItem & {
    length: number;
    spawnPointCount: number;
};
