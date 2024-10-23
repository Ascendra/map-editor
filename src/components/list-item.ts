import { Joyst, Subject } from "joyst";
import { MapService } from "../services/map-service";
import { PlatformsService } from "../services/platforms-service";
import { UtilityService } from "../services/utility-service";

export type Item = {
    label: string;
    id: string;
};

export class ListItem extends Joyst {
    static template = "list-item";

    static props = ["item"];

    private itemSubject?: Subject<Item>;

    onInitialize(): void {
        this.addEvent(
            "click",
            this.dispatchDeleteEvent,
            this.getChild("delete-button")
        );

        this.addEvent(
            "click",
            this.setSelfAsActive
        );

        this.addSubject(MapService.activeItem);
    }

    onChange(
        type: string | Subject,
        newValue: string
    ) {
        switch (type) {
            case "item":
                this.setNewItemSubject(newValue);
                break;
            case this.itemSubject:
                this.updateLabel();
                break;
            case MapService.activeItem:
                this.updateActive();
                break;
        }
    }

    private setNewItemSubject(newSubjectName: string): void {
        if (this.itemSubject !== undefined) {
            this.removeSubject(this.itemSubject);
        }

        const newItemSubject = Subject.for(newSubjectName);

        UtilityService.assert(
            newItemSubject !== undefined,
            `Received invalid subject name: ${newSubjectName} for list-item`
        );

        this.itemSubject = newItemSubject;
        this.addSubject(this.itemSubject);
    }

    private updateLabel(): void {
        UtilityService.assert(
            this.itemSubject !== undefined,
            "Invalid itemSubject"
        );

        this.getChild("label").textContent = this.itemSubject.get().label;
    }

    private updateActive(): void {
        if (MapService.activeItem.get() === this.itemSubject) {
            this.classList.add("active");
        } else {
            this.classList.remove("active");
        }
    }

    private dispatchDeleteEvent = () => {
        this.dispatchEvent(
            new CustomEvent("delete", {
                detail: this.itemSubject,
                bubbles: true
            })
        );
    };

    private setSelfAsActive = () => {
        this.dispatchEvent(
            new CustomEvent("active", {
                detail: this.itemSubject,
                bubbles: true
            })
        );
    };
}
