import { expect, Locator, Page, test } from "@playwright/test";
import { format } from "date-fns";

export class AbstractSurveyRow {
	readonly page: Page;
	readonly itemType: Locator = this.rowContainer.locator(".item-type");
	readonly name: Locator = this.rowContainer.locator(".name");
	readonly timestamp: Locator = this.rowContainer.locator(".timestamp");
	readonly comments: Locator = this.rowContainer.locator(".comments");
	readonly actionsMenu: Locator = this.rowContainer.locator(".actions-menu");

	constructor(readonly rowContainer: Locator) {
		this.page = rowContainer.page();
	}
}

export class HeaderRow extends AbstractSurveyRow {
	readonly timestamp: Locator = this.rowContainer.locator(".updated");
	readonly nameSort: Locator = this.name.locator(".sort-trigger");
	readonly timestampSort: Locator = this.timestamp.locator(".sort-trigger");
	readonly commentsSort: Locator = this.comments.locator(".sort-trigger");
}

export class SurveyRow extends AbstractSurveyRow {
	readonly surveyCreatedAt: Locator = this.rowContainer.locator(".created-at");
	readonly folderSurveysCount: Locator = this.rowContainer.locator(".surveys-count");

	async getName(): Promise<string> {
		return await this.name.getAttribute("title");
	}

	async assertSurveyCreatedAt(date: Date = new Date()): Promise<void> {
		await test.step("Assert survey's createdAt date equals passed date", async () => {
			const dateString = format(date, "MM/dd/yyyy");
			await expect(this.surveyCreatedAt).toContainText(dateString);
		});
	}
}
