import { Locator, test, expect } from "@playwright/test";
import { BaseDialog } from "@ui/components/dialogs/baseDialog";

export class DialogWithInput extends BaseDialog {
	readonly nameField: Locator = this.container.locator(".k-input-inner");

	async fillItemName(name: string) {
		await test.step("Fill the name of the item", async () => {
			await this.nameField.fill(name);
			await this.page.waitForTimeout(500);
		});
	}

	async asserInputDataIsCorrect(text: string) {
		await test.step(`Assert input data is correct - ${text}`, async () => {
			await expect(this.nameField).toHaveValue(text);
		});
	}
}