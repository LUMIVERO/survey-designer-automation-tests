import { dateTimeFormat, dateFormat } from "@data/dateTime.data";
import { isTimeWithinTolerance } from "@helpers/dateTime.helpers";
import { expect, Locator, Page, test } from "@playwright/test";
import { format, parse } from "date-fns";

export class AbstractSurveyRow {
	readonly page: Page;
	readonly itemType: Locator = this.rowContainer.locator(".item-type");
	readonly name: Locator = this.rowContainer.locator(".name");
	readonly nameInput: Locator = this.name.locator("input");
	readonly timestamp: Locator = this.rowContainer.locator(".time-stamp");
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

	async renameSurvey(name: string): Promise<void> {
		await test.step("Rename survey", async () => {
			await this.nameInput.fill(name);
			await this.page.waitForTimeout(500);
			await this.nameInput.press("Enter");
			await this.page.waitForTimeout(500);
		});
	}

	async assertSurveyNameCorrect(name: string): Promise<void> {
		await test.step(`Assert survey name is correct`, async () => {
			expect(await this.getName()).toEqual(name);
		});
	}

	async assertSurveyCreatedAt(date: Date = new Date()): Promise<void> {
		await test.step("Assert survey's createdAt date equals passed date", async () => {
			const dateString = format(date, dateFormat);
			await expect(this.surveyCreatedAt).toContainText(dateString);
		});
	}

	async assertCommentCount(commentCount: number): Promise<void> {
		await test.step("Assert survey's comment count equals passed count", async () => {
			await expect(this.comments).toHaveText(commentCount.toString());
		});
	}

	async assertSurveyUpdatedAt(date: Date = new Date()): Promise<void> {
		await test.step("Assert survey's updatedAt date equals passed date", async () => {
			const actualDate = parse(
				await this.timestamp.textContent(),
				dateTimeFormat,
				new Date()
			);

			expect(isTimeWithinTolerance(
				actualDate, date, 2
			)).toBeTruthy();
		});
	}
}
