import { Locator, test, expect } from "@playwright/test";
import { FolderActionMenu } from "@ui/components/actions/surveysDashboard/folderActionMenu";
import { ItemRow } from "@ui/components/tables/surveys/rows/item.row";

export class FolderRow extends ItemRow<FolderActionMenu> {
	readonly folderSurveysCount: Locator = this.rowContainer.locator(".surveys-count");

	constructor(container: Locator) {
		super(container, FolderActionMenu);
	}

	async assertSurveysCount(surveysCount: number): Promise<void> {
		await test.step("Assert survey's count in folder is correct", async () => {
			await expect(this.folderSurveysCount).toContainText(`${surveysCount} survey${surveysCount === 1 ? "" : "s"}`);
		});
	}
}