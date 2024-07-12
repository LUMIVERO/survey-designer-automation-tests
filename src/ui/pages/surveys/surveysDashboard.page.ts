import { foldersUrl } from "@data/urls/apiUrls";
import { surveyUrl } from "@data/urls/uiUrls";
import { Locator, test } from "@playwright/test";
import { Url } from "@typedefs/ui/surveyPage.typedefs";
import { PopupWithInput } from "@ui/components/popups/popupWithInput";
import { SurveysTable } from "@ui/components/tables/surveys/surveysTable";
import { LoggedInBasePage } from "../loggedIn.base.page";

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
}