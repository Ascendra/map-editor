import { FunctionComponent } from "react";

type InputControlsProps = {
    onSubmit: () => void;
    onCancel: () => void;
};

export const InputControls: FunctionComponent<InputControlsProps> = (
    { onSubmit, onCancel }
) => {
    return (
        <>
            <button type="button" onClick={onSubmit}>✓</button>
            <button type="button" onClick={onCancel}>x</button>
        </>
    );
};
