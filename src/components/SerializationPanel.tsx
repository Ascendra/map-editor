import {
    ChangeEvent,
    FunctionComponent,
    useEffect,
    useMemo,
    useState
} from "react";
import {
    useMapEditorContext,
    useMapEditorContextDispatch
} from "../MapEditorContext";
import { ImportMap } from "../MapEditorContext/MapEditorContextActions";
import { constants } from "../models/constants";
import { CSX } from "../utilities/CSX";

export const SerializationPanel: FunctionComponent = () => {
    const { mapItems, name, width, height } = useMapEditorContext();

    const [currentValue, setCurrentValue] = useState("");
    const [timerId, setTimerId] = useState<ReturnType<typeof setTimeout>>();
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useMapEditorContextDispatch();

    const serializeMap = () => {
        return JSON.stringify(
            {
                version: constants.MAP_FORMAT_VERSION,
                name,
                size: [width, height],
                mapItems
            },
            null,
            "  "
        );
    };

    useEffect(() => {
        setCurrentValue(serializeMap());
    }, [mapItems, name, width, height]);

    const timeoutHandler = useMemo(
        () => (event: ChangeEvent<HTMLTextAreaElement>) => () => {
            try {
                const newMap = JSON.parse(event.target.value);

                if (newMap.version !== constants.MAP_FORMAT_VERSION) {
                    throw new Error("Incompatible map versions");
                }

                setErrorMessage("");
                dispatch({
                    type: ImportMap,
                    newMap
                });
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("An unknown error occured");
                }
            }

            setTimerId(undefined);
        },
        [setErrorMessage, setTimerId, dispatch]
    );

    const importMap = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCurrentValue(event.target.value);

        clearTimeout(timerId);
        setTimerId(setTimeout(timeoutHandler(event), 2000));
    };

    const exportMap = () => {
        const blob = new Blob([serializeMap()], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download =
            `${name}-v${constants.MAP_FORMAT_VERSION}-${Date.now()}.json`;
        anchor.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="serialization-panel">
            <h2>
                Serialization
                <div
                    className="loading-indicator"
                    hidden={timerId === undefined}
                >
                </div>
            </h2>
            <p className="error-message">{errorMessage}</p>
            <textarea
                autoComplete="off"
                autoCorrect="off"
                value={currentValue}
                onChange={importMap}
                className={CSX({ "error": errorMessage !== "" })}
            >
            </textarea>
            <button type="button" onClick={exportMap}>Export</button>
        </div>
    );
};
