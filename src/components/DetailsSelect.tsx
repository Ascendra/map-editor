import { ChangeEvent, FunctionComponent, useMemo } from "react";
import * as uuid from "uuid";
import { CSX } from "../utilities/CSX";

type DetailsSelectProps = {
    options: { id: string; label: string; }[];
    label: string;
    value: string;
    className?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const DetailsSelect: FunctionComponent<DetailsSelectProps> = (
    { options, label, value, onChange, className = "" }
) => {
    const htmlId = useMemo(() => `details-select-${uuid.v4()}`, []);

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
            <select
                id={htmlId}
                value={value}
                onChange={onChange}
            >
                {options.map(({ label, id }) => (
                    <option value={id} key={id}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};
