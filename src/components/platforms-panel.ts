import { Collection, CollectionChangeDetail, Joyst, Subject } from "joyst";
import { MapService } from "../services/map-service";
import { Platform, PlatformsService } from "../services/platforms-service";

export class PlatformsPanel extends Joyst {
    static template = "platforms-panel";

    onInitialize(): void {
        this.addCollection(PlatformsService.platforms);

        this.addEvent(
            "delete",
            this.deletePlatform,
            this.getChild("list-items")
        );

        this.addEvent(
            "click",
            this.addPlatform,
            this.getChild("add-button")
        );

        this.addEvent(
            "active",
            this.setActiveItem,
            this.getChild("list-items")
        );
    }

    onChange(
        _: Collection,
        changeDetails: CollectionChangeDetail
    ): void {
        switch (changeDetails.type) {
            case Collection.Add:
                this.addListItem(changeDetails.value);
                break;
            case Collection.Set:
                this.setListItems();
                break;
            case Collection.Remove:
                this.removeListItem(changeDetails.value);
                break;
        }
    }

    private addListItem(platformSubject: Subject<Platform>): void {
        const newListItem = document.createElement("list-item");
        newListItem.setAttribute("item", `${platformSubject.name}`);

        this.getChild("list-items").appendChild(newListItem);
    }

    private setListItems(): void {
        this.getChild("list-items").replaceChildren();

        PlatformsService.platforms.get().forEach((platform) => {
            this.addListItem(platform);
        });
    }

    private removeListItem(listItemIndex: number): void {
        this.getChild("list-items").children[listItemIndex].remove();
    }

    private addPlatform() {
        PlatformsService.add();
    }

    private deletePlatform(event: CustomEvent<Subject<Platform>>) {
        PlatformsService.remove(event.detail);
    }

    private setActiveItem(event: CustomEvent<Subject>) {
        MapService.activeItem.set(event.detail);
    }
}
