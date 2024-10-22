import { Subject } from "joyst";

export type Entity = {
    id: number;
    x: number;
    y: number;
};

export class EntitiesService {
    public static entities = new Subject<Subject<Entity>[]>([]);

    private static nextId = 0;

    public static add(): Subject<Entity> {
        const newId = this.nextId++;

        const newEntitySubject = new Subject({
            x: 0,
            y: 0,
            id: newId
        }, `entity-${newId}`);

        this.entities.set([
            ...this.entities.get(),
            newEntitySubject
        ]);

        return newEntitySubject;
    }

    public static remove(subject?: Subject<Entity>): void {
        if (!subject) {
            return;
        }

        this.entities.set(
            this.entities.get().filter((entitySubject) =>
                entitySubject !== subject
            )
        );
    }
}
