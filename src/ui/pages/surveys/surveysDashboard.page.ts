import { LoggedInBasePage } from "../loggedIn.base.page";
import { surveyUrl } from "../../../data/urls/uiUrls";
import { Locator, test } from "@playwright/test";
import { PopupWithInput } from "../../components/popups/popupWithInput";
import { foldersUrl } from "../../../data/urls/apiUrls";
import { SurveysTable } from "../../components/tables/surveys/surveysTable";

export class SurveysDashboardPage extends LoggedInBasePage {
	url = surveyUrl.surveysTab;
	readonly createSurveyBtn: Locator = this.page.locator(".qdt-btn-primary", { hasText: "New Survey" });
	readonly createFolderBtn: Locator = this.page.locator(".qdt-btn-primary-outlined", { hasText: "New Folder" });
	readonly createSurveyPopup: PopupWithInput = new PopupWithInput(this.page);
	readonly surveysTable: SurveysTable = new SurveysTable(this.page);

	async clickCreateSurveyBtn(): Promise<void> {
		await test.step("Click [New Survey] button and assert it is opened", async () => {
			await this.createSurveyBtn.click();
			await this.createSurveyPopup.waitForPopupVisible();
			await this.createSurveyPopup.assertPopHeaderIsCorrect("Create new survey");
		});
	}

	async waitForOpened(url?: string | RegExp, waitForFoldersResponse?: boolean): Promise<void> {
		await super.waitForOpened(url);

		waitForFoldersResponse &&
		await this.page.waitForResponse(new RegExp(foldersUrl.folder));
	}
}