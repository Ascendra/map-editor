import { EntityType } from "../models/EntityType";
import { Nullable } from "../models/Nullable";
import { Vector2 } from "../models/Vector2";

export const AddEntity = Symbol("Add Entity");
export const AddPlatform = Symbol("Add Platform");
export const DeleteEntity = Symbol("Delete Entity");
export const DeletePlatform = Symbol("Delete Platform");
export const SetActiveItemId = Symbol("Set Active Item Id");
export const SetEntityType = Symbol("Set Entity Type");
export const SetGrabbedMapItemId = Symbol("Set Grabbed Map Item Id");
export const SetMapItemLabel = Symbol("Set Map Item Label");
export const SetMapItemPosition = Symbol("Set Map Item Position");
export const SetMapItemSize = Symbol("Set Map Item Size");
export const SetMapName = Symbol("Set Map Name");
export const SetMapSize = Symbol("Set Map Size");
export const SetMousePosition = Symbol("Set Mouse Position");
export const SetPlatformSpawnCount = Symbol("Set Platform Spawn Count");

export type MapEditorContextActions =
    | { type: typeof AddEntity; }
    | { type: typeof AddPlatform; }
    | { type: typeof DeleteEntity; entityId: string; }
    | { type: typeof DeletePlatform; platformId: string; }
    | { type: typeof SetActiveItemId; newItemId: Nullable<string>; }
    | { type: typeof SetEntityType; entityId: string; newType: EntityType; }
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
    | { type: typeof SetMousePosition; newPosition: Vector2; }
    | {
        type: typeof SetPlatformSpawnCount;
        platformId: string;
        newCount: number;
    }
    | { type: typeof SetMapName; newName: string; }
    | { type: typeof SetMapSize; newSize: Vector2; }
    | { type: typeof SetMousePosition; newPosition: Vector2; };
