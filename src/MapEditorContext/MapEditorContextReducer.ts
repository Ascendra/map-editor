import * as uuid from "uuid";
import { constants } from "../models/constants";
import { Entity } from "../models/Entity";
import { EntitySizes } from "../models/EntitySizes";
import { EntityType } from "../models/EntityType";
import { MapItemType } from "../models/MapItemType";
import { Platform } from "../models/Platform";
import { randomInt } from "../utilities/randomInt";
import {
    AddEntity,
    AddPlatform,
    DeleteEntity,
    DeletePlatform,
    MapEditorContextActions,
    SetActiveItemId,
    SetEntityType,
    SetGrabbedMapItemId,
    SetMapItemLabel,
    SetMapItemPosition,
    SetMapItemSize,
    SetMousePosition,
    SetPlatformSpawnCount
} from "./MapEditorContextActions";
import { MapEditorContextState } from "./MapEditorContextProvider";

export const mapEditorContextReducer = (
    state: MapEditorContextState,
    action: MapEditorContextActions
): MapEditorContextState => {
    switch (action.type) {
        case AddEntity: {
            const newId = uuid.v4();
            const [width, height] = EntitySizes[EntityType.Portal];
            const newEntity: Entity = {
                x: randomInt(50, state.width - width),
                y: randomInt(50, state.height - height),
                width,
                height,
                type: EntityType.Portal,
                id: newId,
                label: newId,
                mapItemType: MapItemType.Entity
            };

            return {
                ...state,
                entityIds: [
                    ...state.entityIds,
                    newId
                ],
                mapItems: {
                    ...state.mapItems,
                    [newId]: newEntity
                }
            };
        }
        case AddPlatform: {
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
                mapItemType: MapItemType.Platform
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
        }
        case DeleteEntity: {
            return {
                ...state,
                entityIds: state.entityIds.filter(id => id !== action.entityId)
            };
        }
        case DeletePlatform: {
            return {
                ...state,
                platformIds: state.platformIds.filter(id =>
                    id !== action.platformId
                )
            };
        }
        case SetEntityType: {
            const [newWidth, newHeight] = EntitySizes[action.newType];
            const oldEntity = state.mapItems[action.entityId];
            return {
                ...state,
                mapItems: {
                    ...state.mapItems,
                    [action.entityId]: {
                        ...oldEntity,
                        type: action.newType,
                        width: newWidth,
                        height: newHeight
                    }
                }
            };
        }
        case SetActiveItemId: {
            return {
                ...state,
                activeItemId: action.newItemId
            };
        }
        case SetGrabbedMapItemId: {
            return {
                ...state,
                grabbedItemId: action.newItemId
            };
        }
        case SetMapItemLabel: {
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
        }
        case SetMapItemPosition: {
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
        }
        case SetMapItemSize: {
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
        }
        case SetMousePosition: {
            return {
                ...state,
                mousePosition: action.newPosition
            };
        }
        case SetPlatformSpawnCount: {
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
    }
};
