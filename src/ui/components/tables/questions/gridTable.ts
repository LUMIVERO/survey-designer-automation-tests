import { Locator, expect, test } from "@playwright/test";
import { GridRow, HeadGridRow } from "@ui/components/tables/questions/gridRow";

export class GridTable { // TODO: Add implementation for GridTable
	readonly headRow: HeadGridRow = new HeadGridRow(this.container.locator("thead tr"));
	readonly rows: Locator = this.container.locator("tbody tr");

	constructor(readonly container: Locator) {
	}

	getRow(index: number = 1): GridRow {
		return new GridRow(this.rows.nth(index));
	}

	async assertIsVisible(): Promise<void> {
		await test.step("Assert grid table is visible", async () => {
			await expect(this.container).toBeVisible();
		});
	}
}