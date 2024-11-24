import { Locator, Page, test, expect } from "@playwright/test";
import { WaitForOptions } from "@typedefs/playwright/actions.typedefs";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";

export abstract class BaseActionMenuPopup {
	protected readonly container: Locator = this.page.locator(".popover-container.opened");
	protected readonly actions: Locator = this.container.locator(".dropdown-list-option");

	constructor(readonly page: Page) {
	}

	async waitFor(options: WaitForOptions = { state: "visible" }): Promise<void> {
		await test.step("Wait for action menu", async () => {
			await this.container.waitFor(options);
		});
	}

	async assertIsVisible(options?: AssertIsVisible) {
		await test.step("Assert action menu is visible", async () => {
			await expect(this.container).toBeVisible(options);
		});
	}
}
