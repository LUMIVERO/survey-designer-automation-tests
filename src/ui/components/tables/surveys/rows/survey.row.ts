import { Locator, test, expect } from "@playwright/test";
import { SurveyActionMenu } from "@ui/components/actions/surveysDashboard/surveyActionMenu";
import { ItemRow } from "@ui/components/tables/surveys/rows/item.row";
import { format } from "date-fns";
import { dateFormat } from "src/constants/dateTime.data";

export class SurveyRow extends ItemRow<SurveyActionMenu> {
	readonly surveyCreatedAt: Locator = this.rowContainer.locator(".created-at");

	constructor(container: Locator) {
		super(container, SurveyActionMenu);
	}

	async assertSurveyCreatedAt(date: Date = new Date()): Promise<void> {
		await test.step("Assert survey's createdAt date equals passed date", async () => {
			const dateString = format(date, dateFormat);
			await expect(this.surveyCreatedAt).toContainText(dateString);
		});
	}
}