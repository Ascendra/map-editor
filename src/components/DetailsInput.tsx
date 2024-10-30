import { ChangeEvent, FunctionComponent, useMemo } from "react";
import * as uuid from "uuid";

export enum InputType {
    Text = "text",
    Number = "number"
}

type DetailsInputProps = {
    type: InputType;
    label: string;
    value: any;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DetailsInput: FunctionComponent<DetailsInputProps> = (
    { type, label, value, onChange }
) => {
    const htmlId = useMemo(() => `details-input-${uuid.v4()}`, []);

    return (
        <div className="details-input">
            <label htmlFor={htmlId}>
                {label}
            </label>
            <input id={htmlId} type={type} value={value} onChange={onChange} />
        </div>
    );
};
