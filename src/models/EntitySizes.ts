import { EntityType } from "./EntityType";
import { Vector2 } from "./Vector2";

export const EntitySizes: Record<EntityType, Vector2> = {
    [EntityType.PlayerSpawn]: [50, 50],
    [EntityType.Portal]: [150, 250]
} as const;
