import { EntityType } from "./EntityType";
import { MapItem } from "./MapItem";

export type Entity = MapItem & {
    type: EntityType;
};
