import { FunctionComponent, ReactNode } from "react";
import { useMapEditorContext } from "../MapEditorContext";

type MousePositionOverlayProps = {
    children: ReactNode;
};

export const MousePositionOverlay: FunctionComponent<
    MousePositionOverlayProps
> = ({ children }) => {
    const { mousePosition } = useMapEditorContext();

    return (
        <div
            className="mouse-position-overlay"
            data-mouse-x={mousePosition[0]}
            data-mouse-y={mousePosition[1]}
        >
            <div className="wrapper">
                {children}
            </div>
        </div>
    );
};
