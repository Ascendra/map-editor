import { FunctionComponent } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { MapItemType } from "../models/MapItemType";
import { PlatformDetail } from "./PlatformDetails";

export const DetailsPanel: FunctionComponent = () => {
    const { activeItemId, mapItems } = useMapEditorContext();

    if (activeItemId === null) {
        return (
            <div className="details-panel">
                <h2>Details</h2>
            </div>
        );
    }

    const item = mapItems[activeItemId];

    switch (item.type) {
        case MapItemType.Platform:
            return (
                <div className="details-panel">
                    <div>
                        <h2>Details</h2>
                        <p className="subtitle">{item.id}</p>
                    </div>
                    <div className="details">
                        <PlatformDetail platform={item} />
                    </div>
                </div>
            );
    }
};
