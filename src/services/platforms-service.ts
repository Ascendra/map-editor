import { Subject } from "joyst";

export type Platform = {
    x: number;
    y: number;
    length: number;
    spawnPointsCount: number;
    id: number;
};

export class PlatformsService {
    public static platforms = new Subject<Subject<Platform>[]>([]);

    private static nextId = 0;

    public static add(): Subject<Platform> {
        const newId = this.nextId++;

        const newPlatformSubject = new Subject({
            x: 0,
            y: 0,
            length: 1,
            spawnPointsCount: 0,
            id: newId
        }, `platform-${newId}`);

        this.platforms.set([
            ...this.platforms.get(),
            newPlatformSubject
        ]);

        return newPlatformSubject;
    }

    public static remove(subject: Subject<Platform>): void {
        this.platforms.set(
            this.platforms.get().filter((platformSubject) =>
                platformSubject !== subject
            )
        );
    }
}
