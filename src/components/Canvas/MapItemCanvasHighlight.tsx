import { FunctionComponent } from "react";
import { PADDING_SIZE } from "../../models/constants";
import { Rect, RectProps } from "./Rect";

type MapItemCanvasHighlightProps = Omit<RectProps, "lineDash" | "color"> & {
    show: boolean;
};

export const MapItemCanvasHighlight: FunctionComponent<
    MapItemCanvasHighlightProps
> = (
    { x, y, width, height, show }
) => {
    if (!show) {
        return null;
    }

    return (
        <Rect
            x={x - PADDING_SIZE}
            y={y - PADDING_SIZE}
            width={width + PADDING_SIZE * 2}
            height={height + PADDING_SIZE * 2}
            lineDash={[2, 5]}
            color="#FF0000"
        />
    );
};
