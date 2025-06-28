import { Locator, test, expect } from "@playwright/test";
import { SurveyResponse } from "@typedefs/api/survey.typedefs";
import { DeleteFolderOptions } from "@typedefs/ui/folder.typedefs";
import { Url, DuplicateSurveyOptions } from "@typedefs/ui/surveyPage.typedefs";
import { DashboardRowActionMenu } from "@ui/components/actions/dashboardRowActionMenu";
import { DialogWithInput } from "@ui/components/dialogs/dialogWithInput";
import { SurveysTable } from "@ui/components/tables/surveys/surveysTable";
import { foldersUrl, surveysUrl } from "src/constants/urls/apiUrls";
import { surveyUrl } from "src/constants/urls/uiUrls";
import { LoggedInBasePage } from "../loggedIn.base.page";

export class SurveysDashboardPage extends LoggedInBasePage {
	url = surveyUrl.surveysTab;
	readonly createSurveyBtn: Locator = this.page.locator(".main-btn", { hasText: "New Survey" });
	readonly createFolderBtn: Locator = this.page.locator(".qdt-btn-primary-outlined", { hasText: "New Folder" });
	readonly dialogWithInput: DialogWithInput = new DialogWithInput(this.page);
	readonly surveysTable: SurveysTable = new SurveysTable(this.page);
	readonly actionMenu: DashboardRowActionMenu = new DashboardRowActionMenu(this.page);


	async clickCreateSurveyBtn(): Promise<void> {
		await test.step("Click [New Survey] button and assert it is opened", async () => {
			await this.createSurveyBtn.click();
			await this.dialogWithInput.waitForDialogVisible();
			await this.dialogWithInput.assertDialogHeaderIsCorrect("Create new survey");
		});
	}

	async clickCreateFolderBtn(): Promise<void> {
		await test.step("Click [New Folder] button and assert it is opened", async () => {
			await this.createFolderBtn.click();
			await this.dialogWithInput.waitForDialogVisible();
			await this.dialogWithInput.assertDialogHeaderIsCorrect("Create new folder");
		});
	}

	async clickPopoverDuplicateBtn(): Promise<void> {
		await test.step(`Click duplicate button`, async () => {
			await this.actionMenu.clickDuplicateButton();
			await this.dialogWithInput.waitForDialogVisible();
			await this.dialogWithInput.assertDialogHeaderIsCorrect("Duplicate survey");
		});
	}

	async clickPopoverDeleteBtn(): Promise<void> {
		await test.step(`Click delete button`, async () => {
			await this.actionMenu.clickDeleteButton();
		});
	}

	async duplicateSurvey({ surveyName, newSurveyName }: DuplicateSurveyOptions): Promise<SurveyResponse> {
		return test.step("Duplicate survey", async () => {
			const surveyRow = await this.surveysTable.getRowByName(surveyName);

			await expect(async () => {
				await surveyRow.actionsMenu.click();
				await this.clickPopoverDuplicateBtn();
			}).toPass();

			await this.dialogWithInput.asserInputDataIsCorrect(surveyName + "_copy");
			newSurveyName && await this.dialogWithInput.fillItemName(newSurveyName);
			const [, , response] = await Promise.all([
				this.dialogWithInput.clickSubmitBtn(),
				this.dialogWithInput.waitForDialogHidden(),
				this.page.waitForResponse(
					async response =>
						response.request().method() === "POST"
						&& new RegExp(surveysUrl.duplicate).test(response.url())
						&& response.ok(),
				),
			]);

			return response.json();
		});
	}

	async deleteFolder({ name }: DeleteFolderOptions) {
		await test.step("Delete folder", async () => {
			const folderRow = await this.surveysTable.getRowByName(name);
			await folderRow.actionsMenu.click();
			await this.actionMenu.waitFor();
			await Promise.all([
				this.clickPopoverDeleteBtn(),
				this.page.waitForResponse((response) => {
					return response.request().method() === "DELETE"
						&& new RegExp(foldersUrl.details).test(response.url());
				}),
			]);
		});
	}

	async waitForOpened({ waitForResponse }: Url = {}): Promise<void> {
		await super.waitForOpened();

		waitForResponse &&
		await this.waitForFoldersResponse();
	}

	async waitForFoldersResponse(): Promise<void> {
		await test.step("Wait for folders", async () => {
			await this.page.waitForResponse(new RegExp(foldersUrl.details));
		});
	}
}