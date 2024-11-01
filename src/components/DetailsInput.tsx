import { ChangeEvent, FunctionComponent, useMemo } from "react";
import * as uuid from "uuid";
import { CSX } from "../utilities/CSX";

export enum InputType {
    Text = "text",
    Number = "number"
}

type DetailsInputProps = {
    type: InputType;
    label: string;
    validations?: RegExp[];
    value: any;
    className?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DetailsInput: FunctionComponent<DetailsInputProps> = (
    { type, label, value, onChange, validations = [], className = "" }
) => {
    const htmlId = useMemo(() => `details-input-${uuid.v4()}`, []);

    const applyFormatting = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        const isValid = validations.every(validator =>
            validator.test(newValue)
        );

        if (isValid) {
            onChange(event);
        }
    };

    return (
        <div
            className={CSX({
                "details-input": true,
                [className]: true
            })}
        >
            <label htmlFor={htmlId}>
                {label}
            </label>
            <input
                id={htmlId}
                type={type}
                value={value}
                onChange={applyFormatting}
            />
        </div>
    );
};
