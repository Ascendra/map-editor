import {
    ChangeEvent,
    FunctionComponent,
    KeyboardEvent,
    useEffect,
    useRef,
    useState
} from "react";
import { InputControls } from "./InputControls";

type MapNameInputProps = {
    name: string;
    editable: boolean;
    onSubmit: (value: string) => void;
    onCancel: () => void;
    onClick: () => void;
};

export const MapNameInput: FunctionComponent<MapNameInputProps> = (
    { name, editable, onSubmit, onClick, onCancel }
) => {
    const [value, setValue] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);

    const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const resetValue = () => {
        setValue(name);
        onCancel();
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
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(0, name.length);
    }, [editable]);

    if (editable) {
        return (
            <div onKeyDown={submitOnEnter}>
                <input ref={inputRef} value={value} onChange={updateValue} />
                <InputControls onSubmit={submitValue} onCancel={resetValue} />
            </div>
        );
    }

    return <h1 onClick={onClick}>{name}</h1>;
};
