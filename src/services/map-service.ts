import { Subject } from "joyst";

export class MapService {
    static width = new Subject(1920);

    static height = new Subject(1080);

    static name = new Subject("New Map");
}
