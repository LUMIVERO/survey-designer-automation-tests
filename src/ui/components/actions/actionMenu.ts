import { Locator, Page, test } from "@playwright/test";
import { WaitForOptions } from "@typedefs/playwright/actions.typedefs";
import { BaseContainer } from "@ui/components/baseComponent";

export class ActionMenu extends BaseContainer {
	readonly popoverActionBtn: Locator = this.container.locator(".dropdown-list-option");
	readonly deleteButton: Locator = this.popoverActionBtn.filter({ hasText: "Delete" });
	readonly duplicateButton: Locator = this.popoverActionBtn.filter({ hasText: "Duplicate" });

	constructor(page: Page) {
		super(page.locator(".popover-container.opened"))
	}

	async clickDeleteButton(): Promise<void> {
		await this.deleteButton.click();
	}

	async clickDuplicateButton(): Promise<void> {
		await this.duplicateButton.click();
	}

	async waitFor(options: WaitForOptions = { state: "visible" }): Promise<void> {
		await test.step("Wait for action menu popover", async () => {
			await this.container.waitFor(options);
		});
	}
}