import { Locator, test } from "@playwright/test";
import { BasePopup } from "./basePopup";

export class PopupWithInput extends BasePopup {
	readonly nameField: Locator = this.popup.locator(".k-input-inner");

	async fillItemName(name: string) {
		await test.step("Fill the name of the item", async () => {
			await this.nameField.fill(name);
			await this.page.waitForTimeout(500);
		});
	}
}