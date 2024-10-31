import { Locator, Page, test } from "@playwright/test";
import { WaitForOptions } from "@typedefs/playwright/actions.typedefs";

export class ActionMenuPopup {
	protected readonly actionMenuPopover: Locator = this.page.locator(".popover-container.opened");
	protected readonly popoverActions: Locator = this.actionMenuPopover.locator(".dropdown-list-option");
	readonly deleteBtn: Locator = this.popoverActions.filter({ hasText: "Delete" });
	readonly saveInQbankBtn: Locator = this.popoverActions.filter({ hasText: "Save in Qbank" });

	constructor(readonly page: Page) {
	}

	async clickDeleteBtn(): Promise<void> {
		await this.deleteBtn.click();
	}

	async clickSaveInQbankBtn(): Promise<void> {
		await this.saveInQbankBtn.click();
	}

	async waitFor(options: WaitForOptions = { state: "visible" }): Promise<void> {
		await test.step("Wait for action menu popover", async () => {
			await this.actionMenuPopover.waitFor(options);
		});
	}
}