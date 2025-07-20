import { Page, Locator, test } from "@playwright/test";

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
}