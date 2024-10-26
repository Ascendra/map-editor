import * as uuid from "uuid";
import { constants } from "../models/constants";
import { randomInt } from "../utilities/randomInt";
import {
    AddPlatform,
    DeletePlatform,
    MapEditorContextActions,
    SetActiveItemId,
    SetGrabbedMapItemId,
    SetMapItemPosition,
    SetMousePosition
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
            const newPlatform = {
                x: randomInt(50, state.width - 100),
                y: randomInt(50, state.height - 100),
                width: length * constants.GRID_SIZE,
                height: 2,
                length,
                spawnPointsCount: 0,
                id: newId,
                label: newId
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
        case SetMapItemPosition:
            const currentlyGrabbedItem = state.mapItems[action.itemId];
            const newMapItems = {
                ...state.mapItems,
                [action.itemId]: {
                    ...currentlyGrabbedItem,
                    x: action.newPosition[0],
                    y: action.newPosition[1]
                }
            };
            return {
                ...state,
                mapItems: newMapItems
            };
        case SetMousePosition:
            return {
                ...state,
                mousePosition: action.newPosition
            };
    }
};
