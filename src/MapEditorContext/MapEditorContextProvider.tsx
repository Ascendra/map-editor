import {
    createContext,
    Dispatch,
    FunctionComponent,
    ReactNode,
    useReducer
} from "react";
import { Entity } from "../models/Entity";
import { Nullable } from "../models/Nullable";
import { Platform } from "../models/Platform";
import { Vector2 } from "../models/Vector2";
import { MapEditorContextActions } from "./MapEditorContextActions";
import { mapEditorContextReducer } from "./MapEditorContextReducer";

export type MapEditorContextState = {
    width: number;
    height: number;
    name: string;
    activeItemId: Nullable<string>;
    grabbedItemId: Nullable<string>;
    initialDragPoint: Nullable<{
        mouse: Vector2;
        item: Vector2;
    }>;
    mouseOverCanvas: boolean;
    mousePosition: Vector2;
    mapCanvasRef: Nullable<HTMLCanvasElement>;
    platformIds: string[];
    entityIds: string[];
    mapItems: Record<string, Platform | Entity>;
};

const initialMapEditorContext: MapEditorContextState = {
    width: 1280,
    height: 720,
    name: "New Map",
    initialDragPoint: null,
    mousePosition: [0, 0],
    mapCanvasRef: null,
    mouseOverCanvas: false,
    activeItemId: null,
    grabbedItemId: null,
    platformIds: [],
    entityIds: [],
    mapItems: {}
};

export const MapEditorContext = createContext<Nullable<MapEditorContextState>>(
    null
);

export const MapEdtiorContextDispatch = createContext<
    Nullable<Dispatch<MapEditorContextActions>>
>(null);

type MapEditorContextProviderProps = {
    children: ReactNode;
};

export const MapEditorContextProvider: FunctionComponent<
    MapEditorContextProviderProps
> = ({ children }) => {
    const [mapEditorContext, dispatch] = useReducer(
        mapEditorContextReducer,
        initialMapEditorContext
    );

    return (
        <MapEditorContext.Provider value={mapEditorContext}>
            <MapEdtiorContextDispatch.Provider value={dispatch}>
                {children}
            </MapEdtiorContextDispatch.Provider>
        </MapEditorContext.Provider>
    );
};
