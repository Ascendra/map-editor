import { Nullable } from "../models/Nullable";
import { Vector2 } from "../models/Vector2";

export const AddPlatform = Symbol("Add Platform");
export const DeletePlatform = Symbol("Delete Platform");
export const SetActiveItemId = Symbol("Set Active Item Id");
export const SetGrabbedMapItemId = Symbol("Set Grabbed Map Item Id");
export const SetMapItemLabel = Symbol("Set Map Item Label");
export const SetMapItemPosition = Symbol("Set Map Item Position");
export const SetMapItemSize = Symbol("Set Map Item Size");
export const SetMousePosition = Symbol("Set Mouse Position");
export const SetPlatformSpawnCount = Symbol("Set Platform Spawn Count");

export type MapEditorContextActions =
    | { type: typeof SetActiveItemId; newItemId: Nullable<string>; }
    | { type: typeof SetMousePosition; newPosition: Vector2; }
    | {
        type: typeof SetGrabbedMapItemId;
        newItemId: Nullable<string>;
    }
    | { type: typeof SetMapItemLabel; itemId: string; newLabel: string; }
    | {
        type: typeof SetMapItemPosition;
        itemId: string;
        newPosition: Vector2;
    }
    | {
        type: typeof SetMapItemSize;
        itemId: string;
        newSize: Vector2;
    }
    | { type: typeof DeletePlatform; targetPlatformId: string; }
    | { type: typeof AddPlatform; }
    | {
        type: typeof SetPlatformSpawnCount;
        platformId: string;
        newCount: number;
    };
