import { expect, Locator, Page, test } from "@playwright/test";
import { HeaderRow, ItemRow } from "src/ui/components/tables/surveys/itemRows";

export class SurveysTable {
	readonly table: Locator = this.page.locator(".surveys-list");
	readonly body: Locator = this.table.locator(".surveys-list-body");
	readonly rows: Locator = this.body.locator(".survey-list-item");
	readonly header: HeaderRow = new HeaderRow(this.table.locator(".surveys-list-header"));

	constructor(readonly page: Page) {
	}

	async assertItemInList(name: string, options?: { exact?: boolean }): Promise<void> {
		await test.step(`Assert item '${name}' is displayed in the survey list`, async () => {
			await expect(this.rows.getByTitle(name, options)).toBeVisible();
		});
	}

	async getRowByName(name: string): Promise<ItemRow> {
		return new ItemRow(this.rows.filter({ has: this.page.getByTitle(name) }));
	}
}