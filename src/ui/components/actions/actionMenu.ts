import { Locator, Page, test } from "@playwright/test";
import { WaitForOptions } from "@typedefs/playwright/actions.typedefs";

export class ActionMenu {
	readonly actionMenuPopover: Locator = this.page.locator(".k-menu-popup");
	readonly popoverActionBtn: Locator = this.actionMenuPopover.locator(".k-menu-item");
	readonly deleteButton: Locator = this.popoverActionBtn.filter({ hasText: "Delete" });
	readonly duplicateButton: Locator = this.popoverActionBtn.filter({ hasText: "Duplicate" });

	constructor(readonly page: Page) {
	}

	async clickDeleteButton(): Promise<void> {
		await this.deleteButton.filter({ has: this.page.locator(":visible") }).click();
	}

	async clickDuplicateButton(): Promise<void> {
		await this.duplicateButton.filter({ has: this.page.locator(":visible") }).click();
	}

	async waitFor(options: WaitForOptions = { state: "visible" }): Promise<void> {
		await test.step("Wait for action menu popover", async () => {
			await this.actionMenuPopover.waitFor(options);
		});
	}
}