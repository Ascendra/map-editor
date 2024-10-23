import { FunctionComponent, useRef } from "react";
import { useMapEditorMousePositionRecorder } from "../hooks/useMapEditorMousePositionRecorder";
import { useMapEditorContext } from "../MapEditorContext";
import { Canvas } from "./Canvas/Canvas";
import { MousePositionOverlay } from "./MousePositionOverlay";
import { PlatformCanvasItem } from "./PlatformCanvasItem";

export const MapViewPanel: FunctionComponent = () => {
    const { height, width, platforms } = useMapEditorContext();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useMapEditorMousePositionRecorder(canvasRef, [width, height]);

    return (
        <div className="map-view-panel">
            <MousePositionOverlay>
                <Canvas height={height} width={width} ref={canvasRef}>
                    {platforms.map((platform) => (
                        <PlatformCanvasItem
                            key={platform.id}
                            platform={platform}
                        />
                    ))}
                </Canvas>
            </MousePositionOverlay>
        </div>
    );
};
