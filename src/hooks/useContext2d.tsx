import { createContext, useContext } from "react";

export const CanvasContext2d = createContext<CanvasRenderingContext2D | null>(
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
