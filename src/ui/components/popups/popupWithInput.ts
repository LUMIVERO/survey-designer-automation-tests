import { Locator, test, expect } from "@playwright/test";
import { BasePopup } from "./basePopup";

export class PopupWithInput extends BasePopup {
	readonly nameField: Locator = this.popup.locator(".k-input-inner");

	async fillItemName(name: string) {
		await test.step("Fill the name of the item", async () => {
			await this.nameField.fill(name);
			await this.page.waitForTimeout(500);
		});
	}

	async asserInputDataIsCorrect(text: string) {
		await test.step(`Assert input data is correct - ${text}`, async () => {
			expect(await this.nameField.inputValue()).toEqual(text);
		});
	}
}