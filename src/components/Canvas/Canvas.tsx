import {
    forwardRef,
    ReactNode,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import { CanvasContext2d } from "../../hooks/useContext2d";

type CanvasProps = {
    height: number;
    width: number;
    children?: ReactNode;
};

export const Canvas = forwardRef<
    HTMLCanvasElement,
    CanvasProps
>((
    { height, width, children },
    ref
) => {
    const [context2d, setContext2d] = useState<CanvasRenderingContext2D | null>(
        null
    );
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
        const context = canvasRef.current?.getContext("2d") || null;
        setContext2d(context);
    }, [canvasRef, setContext2d]);

    if (context2d !== null) {
        context2d.clearRect(0, 0, width, height);
    }

    return (
        <canvas
            height={height}
            width={width}
            ref={canvasRef}
        >
            <CanvasContext2d.Provider value={context2d}>
                {children}
            </CanvasContext2d.Provider>
        </canvas>
    );
});
