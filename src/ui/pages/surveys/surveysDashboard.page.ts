import { foldersUrl } from "@data/urls/apiUrls";
import { surveyUrl } from "@data/urls/uiUrls";
import { Locator, test } from "@playwright/test";
import { Url, DuplicateSurveyOptions } from "@typedefs/ui/surveyPage.typedefs";
import { PopupWithInput } from "@ui/components/popups/popupWithInput";
import { SurveysTable } from "@ui/components/tables/surveys/surveysTable";
import { LoggedInBasePage } from "../loggedIn.base.page";

export class SurveysDashboardPage extends LoggedInBasePage {
	url = surveyUrl.surveysTab;
	readonly createSurveyBtn: Locator = this.page.locator(".qdt-btn-primary", { hasText: "New Survey" });
	readonly createFolderBtn: Locator = this.page.locator(".qdt-btn-primary-outlined", { hasText: "New Folder" });
	readonly popupWithInput: PopupWithInput = new PopupWithInput(this.page);
	readonly surveysTable: SurveysTable = new SurveysTable(this.page);
	readonly actionMenuPopover: Locator = this.page.locator(".k-popover-body");
	readonly popoverActionBtn: Locator = this.actionMenuPopover.locator("button");

	async clickCreateSurveyBtn(): Promise<void> {
		await test.step("Click [New Survey] button and assert it is opened", async () => {
			await this.createSurveyBtn.click();
			await this.popupWithInput.waitForPopupVisible();
			await this.popupWithInput.assertPopHeaderIsCorrect("Create new survey");
		});
	}

	async clickPopoverActionBtn(actionName: string = "Action"): Promise<void> {
		await test.step(`Click ${actionName} button`, async () => {
			await this.popoverActionBtn.filter({ has: this.page.locator(":visible") }).click();
			await this.popupWithInput.waitForPopupVisible();
			await this.popupWithInput.assertPopHeaderIsCorrect("Duplicate survey");
		});
	}

	async duplicateSurvey(options: DuplicateSurveyOptions): Promise<void> {
		await test.step("Duplicate survey", async () => {
			const { surveyName, newSurveyName } = options;
			const surveyRow = await this.surveysTable.getRowByName(surveyName);

			await surveyRow.actionsMenu.click();
			await this.waitForPopover();
			await this.clickPopoverActionBtn("Duplicate");

			await this.popupWithInput.asserInputDataIsCorrect(surveyName + "_copy");
			newSurveyName && await this.popupWithInput.fillItemName(newSurveyName);
			await this.popupWithInput.clickSubmitBtn();
			await this.popupWithInput.waitForPopupHidden();
		});
	}

	async waitForOpened(options?: Url): Promise<void> {
		const { url, waitForResponse } = options ?? {};
		await super.waitForOpened({ url });

		waitForResponse &&
		await this.waitForFoldersResponse();
	}

	async waitForFoldersResponse(): Promise<void> {
		await test.step("Wait for folders", async () => {
			await this.page.waitForResponse(new RegExp(foldersUrl.folder));
		});
	}

	async waitForPopover(): Promise<void> {
		await test.step("Wait for action menu popover", async () => {
			await this.actionMenuPopover.waitFor({ state: "visible" });
		});
	}
}