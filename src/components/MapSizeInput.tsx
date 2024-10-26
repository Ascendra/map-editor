import {
    ChangeEvent,
    FunctionComponent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState
} from "react";
import { Vector2 } from "../models/Vector2";
import { InputControls } from "./InputControls";

type MapSizeInputProps = {
    size: Vector2;
    editable: boolean;
    onSubmit: (value: Vector2) => void;
    onClick: () => void;
};

export const MapSizeInput: FunctionComponent<MapSizeInputProps> = (
    { size, editable, onSubmit, onClick }
) => {
    const [value, setValue] = useState(size);
    const widthInputRef = useRef<HTMLInputElement>(null);

    const updateWidth = (event: ChangeEvent<HTMLInputElement>) => {
        const newWidth = +event.target.value;

        if (!isNaN(newWidth)) {
            setValue([+event.target.value, value[1]]);
        }
    };

    const updateHeight = (event: ChangeEvent<HTMLInputElement>) => {
        const newHeight = +event.target.value;

        if (!isNaN(newHeight)) {
            setValue([value[0], +event.target.value]);
        }
    };

    const resetValue = () => {
        setValue(size);
    };

    const submitValue = () => {
        onSubmit(value);
    };

    const submitOnEnter = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            submitValue();
        }
    };

    useEffect(() => {
        widthInputRef.current?.focus();
        widthInputRef.current?.setSelectionRange(0, `${size[0]}`.length);
    }, [editable]);

    if (editable) {
        return (
            <div onKeyDown={submitOnEnter}>
                <input
                    ref={widthInputRef}
                    value={value[0]}
                    onChange={updateWidth}
                />
                <input value={value[1]} onChange={updateHeight} />
                <InputControls onSubmit={submitValue} onCancel={resetValue} />
            </div>
        );
    }

    return <h3 onClick={onClick}>{size[0]} x {size[1]}</h3>;
};
