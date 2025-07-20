import { Page, Locator, test, expect } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";

export class BaseItemRow {
	readonly page: Page;
	readonly itemType: Locator = this.rowContainer.locator(".item-type");
	readonly name: Locator = this.rowContainer.locator(".name");
	readonly nameInput: Locator = this.name.locator("input");
	readonly timestamp: Locator = this.rowContainer.locator(".time-stamp");
	readonly comments: Locator = this.rowContainer.locator(".comments");

	constructor(readonly rowContainer: Locator) {
		this.page = rowContainer.page();
	}

	async click(): Promise<void> {
		await test.step("Click on item row", async () => {
			await this.itemType.click();
		});
	}

	async assertIsVisible(options?: AssertIsVisible): Promise<void> {
		await test.step("Assert row is visible", async () => {
			await expect(this.rowContainer).toBeVisible(options);
		});
	}
}