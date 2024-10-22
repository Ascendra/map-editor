import { Collection, Joyst, Subject } from "joyst";
import { MapService } from "../services/map-service";
import { PlatformsService } from "../services/platforms-service";

export class MapViewerPanel extends Joyst {
    static template = "map-viewer-panel";

    private context!: CanvasRenderingContext2D;

    onInitialize(): void {
        const canvas = this.getChild<HTMLCanvasElement>("canvas");
        const context = canvas.getContext("2d");

        if (context === null) {
            throw new Error("Could not get 2d context for map viewer canvas");
        }

        this.context = context;

        this.addSubject(MapService.height);
        this.addSubject(MapService.width);
        this.addSubject(MapService.activeItem);

        this.addCollection(PlatformsService.platforms);
    }

    onChange(type: Subject | Collection): void {
        switch (type) {
            case MapService.height:
            case MapService.width:
                this.resizeCanvas();
                break;
            case PlatformsService.platforms:
            case MapService.activeItem:
                this.redrawPlatforms();
                break;
        }
    }

    private resizeCanvas(): void {
        const canvas = this.getChild<HTMLCanvasElement>("canvas");
        const height = MapService.height.get();
        const width = MapService.width.get();

        canvas.height = height;
        canvas.width = width;
    }

    private redrawPlatforms(): void {
        const canvas = this.getChild<HTMLCanvasElement>("canvas");
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        const platforms = PlatformsService.platforms.get();

        platforms.forEach((platform) => {
            const { x, y, length } = platform.get();

            const isActive = MapService.activeItem.get() === platform;

            this.context.beginPath();
            this.context.moveTo(x, y);
            this.context.lineTo(x + length * MapService.grid, y);
            this.context.strokeStyle = isActive ? "#FF0000" : "#000000";
            this.context.stroke();
        });
    }
}
