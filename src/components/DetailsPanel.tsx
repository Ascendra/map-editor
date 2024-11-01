import { FunctionComponent, ReactNode } from "react";
import { useMapEditorContext } from "../MapEditorContext";
import { isEntity } from "../utilities/isEntity";
import { isPlatform } from "../utilities/isPlatform";
import { EntityDetail } from "./EntityDetail";
import { PlatformDetail } from "./PlatformDetail";

const DetailsPanelWrapper: FunctionComponent<
    { subTitle?: string; children?: ReactNode; }
> = ({ subTitle, children }) => {
    return (
        <div className="details-panel">
            <div>
                <h2>Details</h2>
                {subTitle
                    && <p className="subtitle">{subTitle}</p>}
            </div>
            <div className="details">
                {children}
            </div>
        </div>
    );
};

export const DetailsPanel: FunctionComponent = () => {
    const { activeItemId, mapItems } = useMapEditorContext();

    if (activeItemId === null) {
        return <DetailsPanelWrapper />;
    }

    const item = mapItems[activeItemId];

    if (isPlatform(item)) {
        return (
            <DetailsPanelWrapper subTitle={item.id}>
                <PlatformDetail platform={item} />
            </DetailsPanelWrapper>
        );
    }

    if (isEntity(item)) {
        return (
            <DetailsPanelWrapper subTitle={item.id}>
                <EntityDetail entity={item} />
            </DetailsPanelWrapper>
        );
    }
};
