import * as uuid from "uuid";
import { constants } from "../models/constants";
import { Entity } from "../models/Entity";
import { EntitySizes } from "../models/EntitySizes";
import { EntityType } from "../models/EntityType";
import { MapItemType } from "../models/MapItemType";
import { Platform } from "../models/Platform";
import {
    AddEntity,
    AddPlatform,
    DeleteEntity,
    DeletePlatform,
    ImportMap,
    MapEditorContextActions,
    SetActiveItemId,
    SetEntityType,
    SetGrabbedMapItemId,
    SetMapCanvasRef,
    SetMapItemLabel,
    SetMapItemPosition,
    SetMapItemSize,
    SetMapName,
    SetMapSize,
    SetMouseOverCanvas,
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
                x: constants.PADDING_SIZE,
                y: constants.PADDING_SIZE,
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
            const newId = uuid.v4();
            const newPlatform: Platform = {
                x: constants.PADDING_SIZE,
                y: constants.PADDING_SIZE,
                width: 50 * constants.GRID_SIZE,
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
            const newMapItems = { ...state.mapItems };
            delete newMapItems[action.entityId];

            return {
                ...state,
                entityIds: state.entityIds.filter(id => id !== action.entityId),
                activeItemId: state.activeItemId === action.entityId
                    ? null
                    : state.activeItemId,
                mapItems: newMapItems
            };
        }
        case DeletePlatform: {
            const newMapItems = { ...state.mapItems };
            delete newMapItems[action.platformId];

            return {
                ...state,
                platformIds: state.platformIds.filter(id =>
                    id !== action.platformId
                ),
                activeItemId: state.activeItemId === action.platformId
                    ? null
                    : state.activeItemId,
                mapItems: newMapItems
            };
        }
        case ImportMap: {
            return {
                ...state,
                name: action.newMap.name,
                width: action.newMap.size[0],
                height: action.newMap.size[1],
                mapItems: action.newMap.mapItems
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
            if (action.newItemId === null) {
                return {
                    ...state,
                    grabbedItemId: action.newItemId,
                    initialDragPoint: null
                };
            }
            const grabbedItem = state.mapItems[action.newItemId];
            return {
                ...state,
                grabbedItemId: action.newItemId,
                initialDragPoint: {
                    mouse: [...state.mousePosition],
                    item: [grabbedItem.x, grabbedItem.y]
                }
            };
        }
        case SetMapCanvasRef: {
            return {
                ...state,
                mapCanvasRef: action.newRef
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
        case SetMapName: {
            return {
                ...state,
                name: action.newName
            };
        }
        case SetMapSize: {
            return {
                ...state,
                width: action.newSize[0],
                height: action.newSize[1]
            };
        }
        case SetMousePosition: {
            return {
                ...state,
                mousePosition: action.newPosition
            };
        }
        case SetMouseOverCanvas: {
            return {
                ...state,
                mouseOverCanvas: action.mouseOver
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
