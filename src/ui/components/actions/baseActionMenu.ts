import { Locator, test, Page } from "@playwright/test";
import { WaitForOptions } from "@typedefs/playwright/actions.typedefs";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { BaseContainer } from "@ui/components/baseComponent";

export abstract class BaseActionMenuPopup extends BaseContainer {
	protected readonly actions: Locator = this.container.locator(".dropdown-list-option");

	constructor(page: Page) {
		super(page.locator(".popover-container.opened"));
	}

	async waitFor(options: WaitForOptions = { state: "visible" }): Promise<void> {
		await test.step("Wait for action menu", async () => {
			await this.container.waitFor(options);
		});
	}

	async assertIsVisible(options?: AssertIsVisible) {
		await test.step("Assert action menu is visible", async () => {
			await super.assertIsVisible(options);
		});
	}
}
