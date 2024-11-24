import { Locator, test } from "@playwright/test";
import { WaitForOptions } from "@typedefs/playwright/actions.typedefs";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class ActionMenuPopup extends BaseActionMenuPopup {

	readonly deleteBtn: Locator = this.actions.filter({ hasText: "Delete" });
	readonly saveInQbankBtn: Locator = this.actions.filter({ hasText: "Save in Qbank" });

	async clickDeleteBtn(): Promise<void> {
		await this.deleteBtn.click();
	}

	async clickSaveInQbankBtn(): Promise<void> {
		await this.saveInQbankBtn.click();
	}

	async waitFor(options: WaitForOptions = { state: "visible" }): Promise<void> {
		await test.step("Wait for action menu popover", async () => {
			await this.container.waitFor(options);
		});
	}
}
