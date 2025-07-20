import { Locator, test } from "@playwright/test";
import { DeleteFolderOptions } from "@typedefs/ui/folder.typedefs";
import { Url } from "@typedefs/ui/surveyPage.typedefs";
import { DashboardItemActionMenu } from "@ui/components/actions/surveysDashboard/dashboardItemActionMenu";
import { DialogWithInput } from "@ui/components/dialogs/dialogWithInput";
import { SurveysTable } from "@ui/components/tables/surveys/surveysTable";
import { foldersUrl } from "src/constants/urls/apiUrls";
import { surveyUrl } from "src/constants/urls/uiUrls";
import { LoggedInBasePage } from "../loggedIn.base.page";

export class SurveysDashboardPage extends LoggedInBasePage {
	url = surveyUrl.surveysTab;
	readonly createSurveyBtn: Locator = this.page.locator(".main-btn", { hasText: "New Survey" });
	readonly createFolderBtn: Locator = this.page.locator(".qdt-btn-primary-outlined", { hasText: "New Folder" });
	readonly dialogWithInput: DialogWithInput = new DialogWithInput(this.page);
	readonly surveysTable: SurveysTable = new SurveysTable(this.page);
	readonly actionMenu: DashboardItemActionMenu = new DashboardItemActionMenu(this.page);


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

	async deleteFolder({ name }: DeleteFolderOptions): Promise<void> {
		await test.step("Delete folder", async () => {
			const folderRow = await this.surveysTable.getRowByName(name, { rowType: "folder" });
			const actionsMenu = await folderRow.clickActionMenuBtn();
			await actionsMenu.clickDeleteButton();
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