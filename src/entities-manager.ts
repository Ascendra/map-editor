import { Subject } from "joyst";

export type Entity = {
    id: number;
    x: number;
    y: number;
};

export class EntitiesManager {
    public static entities: Subject<Entity>[] = [];

    public static entityIds = new Subject<number[]>([]);

    private static nextId = 0;

    public static add(): Subject<Entity> {
        const newId = this.nextId++;

        const newEntitySubject = new Subject({
            x: 0,
            y: 0,
            id: newId
        });

        this.entities.push(newEntitySubject);

        this.entityIds.set([
            ...this.entityIds.get(),
            newId
        ]);

        return newEntitySubject;
    }

    public static remove(subject: Subject<Entity>): void {
        this.entities = this.entities.filter((entitySubject) =>
            entitySubject !== subject
        );

        this.entityIds.set(
            this.entityIds.get().filter(id => id !== subject.get().id)
        );
    }
}
