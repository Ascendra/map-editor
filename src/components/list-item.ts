import { Joyst } from "joyst";

export class ListItem extends Joyst {
    static template = "list-item";

    static props = ["label", "item-id"];

    onInitialize(): void {
        this.addEvent(
            "click",
            this.dispatchDeleteEvent,
            this.getChild("delete-button")
        );
    }

    onChange(type: string, newValue: string) {
        if (type === "label") {
            this.getChild("label").textContent = newValue;
        }
    }

    private dispatchDeleteEvent = () => {
        this.dispatchEvent(
            new CustomEvent("delete", {
                detail: this.getAttribute("item-id"),
                bubbles: true
            })
        );
    };
}
