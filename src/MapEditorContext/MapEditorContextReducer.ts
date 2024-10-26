import * as uuid from "uuid";
import { constants } from "../models/constants";
import { MapItemType } from "../models/MapItemType";
import { Platform } from "../models/Platform";
import { randomInt } from "../utilities/randomInt";
import {
    AddPlatform,
    DeletePlatform,
    MapEditorContextActions,
    SetActiveItemId,
    SetGrabbedMapItemId,
    SetMapItemLabel,
    SetMapItemPosition,
    SetMapItemSize,
    SetMapName,
    SetMapSize,
    SetMousePosition,
    SetPlatformSpawnCount
} from "./MapEditorContextActions";
import { MapEditorContextState } from "./MapEditorContextProvider";

export const mapEditorContextReducer = (
    state: MapEditorContextState,
    action: MapEditorContextActions
): MapEditorContextState => {
    switch (action.type) {
        case AddPlatform:
            const length = randomInt(10, 50);
            const newId = uuid.v4();
            const newPlatform: Platform = {
                x: randomInt(50, state.width - 100),
                y: randomInt(50, state.height - 100),
                width: length * constants.GRID_SIZE,
                height: 0,
                spawnPointCount: 0,
                id: newId,
                label: newId,
                type: MapItemType.Platform
            };

            return {
                ...state,
                platformIds: [
                    ...state.platformIds,
                    newId
                ],
                mapItems: {
                    ...state.mapItems,
                    [newId]: newPlatform
                }
            };
        case DeletePlatform:
            return {
                ...state,
                platformIds: state.platformIds.filter(id =>
                    id !== action.targetPlatformId
                )
            };
        case SetActiveItemId:
            return {
                ...state,
                activeItemId: action.newItemId
            };
        case SetGrabbedMapItemId:
            return {
                ...state,
                grabbedItemId: action.newItemId
            };
        case SetMapItemLabel:
            return {
                ...state,
                mapItems: {
                    ...state.mapItems,
                    [action.itemId]: {
                        ...state.mapItems[action.itemId],
                        label: action.newLabel
                    }
                }
            };
        case SetMapItemPosition:
            const newMapItems = {
                ...state.mapItems,
                [action.itemId]: {
                    ...state.mapItems[action.itemId],
                    x: action.newPosition[0],
                    y: action.newPosition[1]
                }
            };
            return {
                ...state,
                mapItems: newMapItems
            };
        case SetMapItemSize:
            return {
                ...state,
                mapItems: {
                    ...state.mapItems,
                    [action.itemId]: {
                        ...state.mapItems[action.itemId],
                        width: action.newSize[0],
                        height: action.newSize[1]
                    }
                }
            };
        case SetMapName:
            return {
                ...state,
                name: action.newName
            };
        case SetMapSize:
            return {
                ...state,
                width: action.newSize[0],
                height: action.newSize[1]
            };
        case SetMousePosition:
            return {
                ...state,
                mousePosition: action.newPosition
            };
        case SetPlatformSpawnCount:
            return {
                ...state,
                mapItems: {
                    ...state.mapItems,
                    [action.platformId]: {
                        ...state.mapItems[action.platformId],
                        spawnPointCount: action.newCount
                    }
                }
            };
    }
};
