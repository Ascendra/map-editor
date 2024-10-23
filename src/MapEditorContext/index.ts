import { useContext } from "react";
import {
    MapEditorContext,
    MapEdtiorContextDispatch
} from "./MapEditorContextProvider";

export const useMapEditorContext = () => {
    return useContext(MapEditorContext)!;
};

export const useMapEditorContextDispatch = () => {
    return useContext(MapEdtiorContextDispatch)!;
};
