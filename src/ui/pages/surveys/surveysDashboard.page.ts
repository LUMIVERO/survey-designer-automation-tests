import { Locator, test } from "@playwright/test";
import { DeleteFolderOptions } from "@typedefs/ui/folder.typedefs";
import { Url, DuplicateSurveyOptions } from "@typedefs/ui/surveyPage.typedefs";
import { DialogWithInput } from "@ui/components/dialogs/dialogWithInput";
import { SurveysTable } from "@ui/components/tables/surveys/surveysTable";
import { foldersUrl } from "src/constants/urls/apiUrls";
import { surveyUrl } from "src/constants/urls/uiUrls";
import { LoggedInBasePage } from "../loggedIn.base.page";

export class SurveysDashboardPage extends LoggedInBasePage {
	url = surveyUrl.surveysTab;
	readonly createSurveyBtn: Locator = this.page.locator(".qdt-btn-primary", { hasText: "New Survey" });
	readonly createFolderBtn: Locator = this.page.locator(".qdt-btn-primary-outlined", { hasText: "New Folder" });
	readonly dialogWithInput: DialogWithInput = new DialogWithInput(this.page);
	readonly surveysTable: SurveysTable = new SurveysTable(this.page);
	readonly actionMenuPopover: Locator = this.page.locator(".k-popover-body");
	readonly popoverActionBtn: Locator = this.actionMenuPopover.locator("button");

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
			await this.popoverActionBtn.filter({ has: this.page.locator(":visible") }).click();
			await this.dialogWithInput.waitForDialogVisible();
			await this.dialogWithInput.assertDialogHeaderIsCorrect("Duplicate survey");
		});
	}

	async clickPopoverDeleteBtn(): Promise<void> {
		await test.step(`Click delete button`, async () => {
			await this.popoverActionBtn.filter({ has: this.page.locator(":visible") }).click();
		});
	}

	async duplicateSurvey(options: DuplicateSurveyOptions): Promise<void> {
		await test.step("Duplicate survey", async () => {
			const { surveyName, newSurveyName } = options;
			const surveyRow = await this.surveysTable.getRowByName(surveyName);

			const waitForPopover = this.waitForPopover();
			await surveyRow.actionsMenu.click();
			await waitForPopover;
			await this.clickPopoverDuplicateBtn();

			await this.dialogWithInput.asserInputDataIsCorrect(surveyName + "_copy");
			newSurveyName && await this.dialogWithInput.fillItemName(newSurveyName);
			await this.dialogWithInput.clickSubmitBtn();
			await this.dialogWithInput.waitForDialogHidden();
		});
	}

	async deleteFolder({ name }: DeleteFolderOptions) {
		await test.step("Delete folder", async () => {
			const folderRow = await this.surveysTable.getRowByName(name);
			await folderRow.actionsMenu.click();
			await this.waitForPopover();
			await this.clickPopoverDeleteBtn();
			await this.page.waitForResponse((response) => {
				return response.request().method() === "DELETE"
					&& new RegExp(foldersUrl.folder).test(response.url());
			});
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