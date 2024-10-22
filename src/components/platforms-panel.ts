import { Collection, CollectionChangeDetail, Joyst, Subject } from "joyst";
import { Platform, PlatformsService } from "../services/platforms-service";

export class PlatformsPanel extends Joyst {
    static template = "platforms-panel";

    onInitialize(): void {
        this.addCollection(PlatformsService.platforms);

        this.addEvent(
            "delete",
            this.removePlatform,
            this.getChild("list-items")
        );

        this.addEvent(
            "click",
            this.addNewPlatform,
            this.getChild("add-button")
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
        const { id } = platformSubject.get();

        const newListItem = document.createElement("list-item");
        newListItem.setAttribute("label", `${id}`);
        newListItem.setAttribute("item-id", `${platformSubject.name}`);

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

    private addNewPlatform() {
        PlatformsService.add();
    }

    private removePlatform(event: CustomEvent<string>) {
        PlatformsService.remove(event.detail);
    }
}
