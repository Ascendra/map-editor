import { Subject } from "joyst";

export type Platform = {
    x: number;
    y: number;
    length: number;
    spawnPointsCount: number;
    id: number;
};

export class PlatformsManager {
    public static platforms: Subject<Platform>[] = [];

    public static platformIds = new Subject<number[]>([]);

    private static nextId = 0;

    public static add(): Subject<Platform> {
        const newId = this.nextId++;

        const newPlatformSubject = new Subject({
            x: 0,
            y: 0,
            length: 1,
            spawnPointsCount: 0,
            id: newId
        });

        this.platforms.push(newPlatformSubject);

        this.platformIds.set([
            ...this.platformIds.get(),
            newId
        ]);

        return newPlatformSubject;
    }

    public static remove(subject: Subject<Platform>): void {
        this.platforms = this.platforms.filter((platformSubject) =>
            platformSubject !== subject
        );

        this.platformIds.set(
            this.platformIds.get().filter(id => id !== subject.get().id)
        );
    }
}
