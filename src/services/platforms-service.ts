import { Collection, Subject } from "joyst";
import { Item } from "../components/list-item";
import { MapService } from "./map-service";
import { UtilityService } from "./utility-service";

export type Platform = Item & {
    x: number;
    y: number;
    length: number;
    spawnPointsCount: number;
};

export class PlatformsService {
    public static platforms = new Collection<Subject<Platform>>();

    private static nextId = 0;

    public static add(): void {
        const newId = `${this.nextId++}`;

        const newPlatformSubject = new Subject({
            x: UtilityService.randomInt(50, MapService.width.get() - 100),
            y: UtilityService.randomInt(50, MapService.height.get() - 100),
            length: UtilityService.randomInt(10, 50),
            spawnPointsCount: 0,
            id: newId,
            label: newId
        }, `platform-${newId}`);

        this.platforms.add(newPlatformSubject);
    }

    public static remove(platformSubject: Subject<Platform>): void {
        this.platforms.remove(platformSubject);
    }
}
