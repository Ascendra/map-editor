import { ActiveItem } from "../models/ActiveItem";
import { Platform } from "../models/Platform";
import { Vector2 } from "../models/Vector2";

export const SetWidth = Symbol("Set Width");
export const SetHeight = Symbol("Set Height");
export const SetName = Symbol("Set Name");
export const SetActiveItem = Symbol("Set Active Item");
export const SetMousePosition = Symbol("Set Mouse Position");
export const DeletePlatform = Symbol("Delete Platform");
export const AddPlatform = Symbol("Add Platform");

export type MapEditorContextActions =
    | { type: typeof SetWidth; newWidth: number; }
    | { type: typeof SetHeight; newHeight: number; }
    | { type: typeof SetName; newName: string; }
    | { type: typeof SetActiveItem; newItem: ActiveItem; }
    | { type: typeof SetMousePosition; newPosition: Vector2; }
    | { type: typeof DeletePlatform; targetPlatform: Platform; }
    | { type: typeof AddPlatform; };
