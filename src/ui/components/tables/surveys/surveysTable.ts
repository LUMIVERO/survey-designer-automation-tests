import { expect, Locator, Page, test } from "@playwright/test";
import { HeaderRow, SurveyRow } from "./surveysRows";

export class SurveysTable {
	readonly table: Locator = this.page.locator(".surveys-list");
	readonly body: Locator = this.table.locator(".surveys-list-body");
	readonly rows: Locator = this.body.locator(".survey-list-item");
	readonly header: HeaderRow = new HeaderRow(this.table.locator(".surveys-list-header"));

	constructor(readonly page: Page) {
	}

	async assertSurveyInList(name: string): Promise<void> {
		await test.step(`Assert survey '${name}' is displayed in the survey list`, async () => {
			await expect(this.rows.getByTitle(name)).toBeVisible();
		});
	}

	async getRowByName(name: string): Promise<SurveyRow> {
		return new SurveyRow(this.rows.filter({ has: this.page.getByTitle(name) }));
	}
}