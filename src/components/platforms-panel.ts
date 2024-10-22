import { Joyst, Subject } from "joyst";
import { PlatformsService } from "../services/platforms-service";

export class PlatformsPanel extends Joyst {
    static template = "platforms-panel";

    onInitialize(): void {
        this.addSubject(PlatformsService.platforms);

        this.addEvent("delete", this.removeListItem);
        this.addEvent(
            "click",
            this.addNewPlatform,
            this.getChild("add-button")
        );
    }

    onChange(): void {
        this.drawListItems();
    }

    private addNewPlatform() {
        PlatformsService.add();
    }

    private drawListItems(): void {
        const platforms = PlatformsService.platforms.get();

        const listItemsContainer = this.getChild("list-items");

        listItemsContainer.replaceChildren();

        platforms.forEach((platform) => {
            const { id } = platform.get();

            const newListItem = document.createElement("list-item");
            newListItem.setAttribute("label", `${id}`);
            newListItem.setAttribute("item-id", `${platform.name}`);

            listItemsContainer.appendChild(newListItem);
        });
    }

    private removeListItem(event: CustomEvent<string>) {
        const idToRemove = event.detail;

        const itemToRemove = Subject.for(idToRemove);

        PlatformsService.remove(itemToRemove);
    }
}
