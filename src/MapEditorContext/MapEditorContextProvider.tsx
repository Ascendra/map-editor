import {
    createContext,
    Dispatch,
    FunctionComponent,
    ReactNode,
    useReducer
} from "react";
import { CanvasRenderableItem } from "../models/CanvasRenderableItem";
import { Nullable } from "../models/Nullable";
import { Platform } from "../models/Platform";
import { Vector2 } from "../models/Vector2";
import { MapEditorContextActions } from "./MapEditorContextActions";
import { mapEditorContextReducer } from "./MapEditorContextReducer";

export type MapEditorContextState = {
    width: number;
    height: number;
    name: string;
    activeItem?: CanvasRenderableItem;
    mousePosition: Vector2;
    grid: number;
    padding: number;
    platforms: Platform[];
};

const initialMapEditorContext: MapEditorContextState = {
    width: 1280,
    height: 720,
    name: "New Map",
    mousePosition: [0, 0],
    grid: 8,
    padding: 25,
    platforms: []
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
