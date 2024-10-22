import { Joyst } from "joyst";

export class ListItem extends Joyst {
    static template = "list-item";

    static inputs = ["label", "item-id"];

    private itemId!: string;

    onInitialize(): void {
        this.addEvent(
            "click",
            this.dispatchDeleteEvent,
            this.getChild("delete-button")
        );
    }

    onChange(type: string, newValue: string) {
        switch (type) {
            case "label":
                this.getChild("label").textContent = newValue;
                break;
            case "item-id":
                this.itemId = newValue;
                break;
        }
    }

    private dispatchDeleteEvent = () => {
        this.dispatchEvent(
            new CustomEvent("delete", { detail: this.itemId, bubbles: true })
        );
    };
}
