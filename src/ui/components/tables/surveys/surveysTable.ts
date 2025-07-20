import { expect, Locator, Page, test } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { RowType } from "@typedefs/ui/surveyPage.typedefs";
import { ItemRow, HeaderRow, SurveyRow, FolderRow } from "./rows";

export class SurveysTable {
	readonly table: Locator = this.page.locator(".surveys-list");
	readonly body: Locator = this.table.locator(".surveys-list-body");
	readonly header: HeaderRow = new HeaderRow(this.table.locator(".surveys-list-header"));

	constructor(readonly page: Page) {
	}

	rows(itemType?: RowType): Locator {
		const item = itemType ? `.${itemType}` : "";

		return this.body.locator(`.survey-list-item${item}`);
	}

	async getRowByName(name: string, options?: { exact?: boolean }): Promise<ItemRow>;
	async getRowByName(name: string, options: { exact?: boolean, rowType: "survey" }): Promise<SurveyRow>;
	async getRowByName(name: string, options: { exact?: boolean, rowType: "wave" }): Promise<SurveyRow>; // TODO: add class implementation if needed
	async getRowByName(name: string, options: { exact?: boolean, rowType: "folder" }): Promise<FolderRow>;
	async getRowByName(name: string, options?: { exact?: boolean, rowType?: RowType }): Promise<ItemRow> {
		switch (options?.rowType) {
			case "wave":
			case "survey":
				return new SurveyRow(this.getItemLocator(name, options));
			case "folder":
				return new FolderRow(this.getItemLocator(name, options));
			default:
				return new ItemRow(this.getItemLocator(name, options));
		}
	}

	async assertItemInList(name: string, options?: { exact?: boolean } & AssertIsVisible): Promise<void> {
		await test.step(`Assert item '${name}' is displayed in the survey list`, async () => {
			await expect(this.rows().getByTitle(name, options)).toBeVisible(options);
		});
	}

	async assertItemNotInList(name: string, options?: { exact?: boolean }): Promise<void> {
		await test.step(`Assert item '${name}' is displayed in the survey list`, async () => {
			await expect(this.rows().getByTitle(name, options)).toBeHidden();
		});
	}

	protected getItemLocator(name: string, options?: { exact?: boolean, rowType?: RowType }): Locator {
		return this.rows(options?.rowType).filter({ has: this.page.getByTitle(name, options) });
	}
}