import { Collection, Subject } from "joyst";

export type Platform = {
    x: number;
    y: number;
    length: number;
    spawnPointsCount: number;
    id: number;
};

export class PlatformsService {
    public static platforms = new Collection<Subject<Platform>>();

    private static nextId = 0;

    public static add(): void {
        const newId = this.nextId++;

        const newPlatformSubject = new Subject({
            x: 0,
            y: 0,
            length: 1,
            spawnPointsCount: 0,
            id: newId
        }, `platform-${newId}`);

        this.platforms.add(newPlatformSubject);
    }

    public static remove(platformName: string): void {
        const platformSubject = Subject.for(platformName);

        if (!platformSubject) {
            return;
        }

        this.platforms.remove(platformSubject);
    }
}
