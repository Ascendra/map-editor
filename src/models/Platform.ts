import { ActiveItem } from "./ActiveItem";

export type Platform = ActiveItem & {
    x: number;
    y: number;
    length: number;
    spawnPointsCount: number;
};
