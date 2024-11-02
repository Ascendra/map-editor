import { EntityType } from "../models/EntityType";

export function isEntityType(key: string): key is EntityType {
    return key in EntityType;
}
