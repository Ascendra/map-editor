import { Subject } from "joyst";

export class MapService {
    static width = new Subject(1280);

    static height = new Subject(720);

    static name = new Subject("New Map");

    static activeItem = new Subject<Subject>(new Subject(null));

    static grid = 8;
}
