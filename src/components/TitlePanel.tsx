import { FunctionComponent, useState } from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import {
    SetMapName,
    SetMapSize
} from "../MapEditorContext/MapEditorContextActions";
import { Vector2 } from "../models/Vector2";
import { MapNameInput } from "./MapNameInput";
import { MapSizeInput } from "./MapSizeInput";

export const TitlePanel: FunctionComponent = () => {
    const [mapNameEditable, setMapNameEditable] = useState(false);
    const [mapSizeEditable, setMapSizeEditable] = useState(false);
    const { name, width, height } = useMapEditorContext();
    const dispatch = useMapEditorContextDispatch();

    const updateMapName = (newMapName: string) => {
        dispatch({
            type: SetMapName,
            newName: newMapName
        });
        setMapNameEditable(false);
    };

    const updateMapSize = (newMapSize: Vector2) => {
        dispatch({
            type: SetMapSize,
            newSize: newMapSize
        });
        setMapSizeEditable(false);
    };

    const makeEditable =
        (editableSetter: React.Dispatch<React.SetStateAction<boolean>>) =>
        () => {
            editableSetter(true);
        };

    return (
        <div className="title-panel">
            <MapNameInput
                name={name}
                editable={mapNameEditable}
                onSubmit={updateMapName}
                onClick={makeEditable(setMapNameEditable)}
            />
            <MapSizeInput
                size={[width, height]}
                editable={mapSizeEditable}
                onSubmit={updateMapSize}
                onClick={makeEditable(setMapSizeEditable)}
            />
        </div>
    );
};
