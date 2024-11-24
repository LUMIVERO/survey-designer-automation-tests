import { Locator, expect, test, Page } from "@playwright/test";
import { Timeout } from "@typedefs/playwright/service.typedefs";
import { GridRow, HeadGridRow } from "@ui/components/tables/questions/gridRow";

export class GridTable { // TODO: Add implementation for GridTable
	readonly page: Page;
	readonly headRow: HeadGridRow = new HeadGridRow(this.container.locator("thead tr"));
	readonly rows: Locator = this.container.locator("tbody tr");
	readonly topicsText: Locator = this.container.locator(".topic-text");

	constructor(readonly container: Locator) {
		this.page = container.page();
	}

	getRow(index: number = 0): GridRow {
		return new GridRow(this.rows.nth(index));
	}

	async rowsCount(options: Timeout = { timeout: 0 }): Promise<number> {
		await this.page.waitForTimeout(options?.timeout);
		return this.rows.count();
	}

	async assertIsVisible(): Promise<void> {
		await test.step("Assert grid table is visible", async () => {
			await expect(this.container).toBeVisible();
		});
	}
}