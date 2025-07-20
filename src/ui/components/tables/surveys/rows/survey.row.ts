import { Locator, test, expect, Page } from "@playwright/test";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { Exact } from "@typedefs/playwright/service.typedefs";
import { SurveyActionMenu } from "@ui/components/actions/surveysDashboard/surveyActionMenu";
import { DialogWithInput } from "@ui/components/dialogs/dialogWithInput";
import { ItemRow } from "@ui/components/tables/surveys/rows/item.row";
import { format } from "date-fns";
import { dateFormat } from "src/constants/dateTime.data";
import { surveysUrl } from "src/constants/urls/apiUrls";

export class SurveyRow extends ItemRow<SurveyActionMenu> {
	static surveyRowSelector = ".survey";
	readonly surveyCreatedAt: Locator = this.rowContainer.locator(".created-at");

	constructor(container: Locator) {
		super(container, SurveyActionMenu);
	}

	static getRowByName(page: Page, name: string, options: Exact = {}): SurveyRow {
		return new SurveyRow(ItemRow.getRowLocator(page, { name, selector: SurveyRow.surveyRowSelector, ...options }));
	}

	async duplicate(newSurveyName?: string): Promise<{
		surveyRow: SurveyRow,
		surveyResponse: SurveyResponse
	}> {
		const surveyName = await this.getName();
		return test.step(`Duplicate survey ${surveyName}`, async () => {
			let dialog: DialogWithInput;
			await expect(async () => {
				const actionsMenu = await this.clickActionMenuBtn();
				dialog = await actionsMenu.clickDuplicateButton();
				await dialog.waitForDialogVisible();
				await dialog.assertDialogHeaderIsCorrect("Duplicate survey");
			}).toPass();

			if (newSurveyName) {
				await dialog.fillItemName(newSurveyName);
			} else {
				newSurveyName = surveyName + "_copy";
			}
			await dialog.asserInputDataIsCorrect(newSurveyName);
			const [response] = await Promise.all([
				this.page.waitForResponse(
					async response =>
						response.request().method() === "POST"
						&& new RegExp(surveysUrl.duplicate).test(response.url())
						&& response.ok(),
				),
				dialog.clickSubmitBtn(),
				dialog.waitForDialogHidden(),
			]);

			return {
				surveyRow: SurveyRow.getRowByName(this.page, newSurveyName),
				surveyResponse: await response.json(),
			};
		});
	}

	async assertSurveyCreatedAt(date: Date = new Date()): Promise<void> {
		await test.step("Assert survey's createdAt date equals passed date", async () => {
			const dateString = format(date, dateFormat);
			await expect(this.surveyCreatedAt).toContainText(dateString);
		});
	}
}