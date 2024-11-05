import { FunctionComponent } from "react";
import { constants } from "../../models/constants";
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

    const { PADDING_SIZE } = constants;

    return (
        <Rect
            x={x - PADDING_SIZE}
            y={y - PADDING_SIZE}
            width={width + PADDING_SIZE * 2}
            height={height + PADDING_SIZE * 2}
            lineDash={[2, 3]}
            borderColor="#000000"
        />
    );
};
