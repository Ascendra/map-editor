import { randomInt } from "../utilities/randomInt";
import {
    AddPlatform,
    DeletePlatform,
    MapEditorContextActions,
    SetActiveItem,
    SetMousePosition
} from "./MapEditorContextActions";
import { MapEditorContextState } from "./MapEditorContextProvider";

let globalId = 0;

export const mapEditorContextReducer = (
    state: MapEditorContextState,
    action: MapEditorContextActions
): MapEditorContextState => {
    switch (action.type) {
        case SetActiveItem:
            return {
                ...state,
                activeItem: action.newItem
            };
        case AddPlatform:
            return {
                ...state,
                platforms: [
                    ...state.platforms,
                    {
                        x: randomInt(50, state.width - 100),
                        y: randomInt(50, state.height - 100),
                        length: randomInt(10, 50),
                        spawnPointsCount: 0,
                        id: `${globalId}`,
                        label: `${globalId++}`
                    }
                ]
            };
        case DeletePlatform:
            return {
                ...state,
                platforms: state.platforms.filter(platform =>
                    platform !== action.targetPlatform
                )
            };
        case SetMousePosition:
            return {
                ...state,
                mousePosition: action.newPosition
            };
        default:
            throw Error(`Unknown action: ${String(action.type)}`);
    }
};
