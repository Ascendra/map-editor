import { createContext, useContext } from "react";
import { Nullable } from "../models/Nullable";

export const CanvasContext2d = createContext<
    Nullable<CanvasRenderingContext2D>
>(
    null
);

export const useContext2d = () => {
    const context = useContext(CanvasContext2d);

    if (context === undefined) {
        throw new Error(
            "You must use this element inside of a Canvas component"
        );
    }

    return context;
};
