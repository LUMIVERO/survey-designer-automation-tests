import { Locator, test, expect } from "@playwright/test";
import { Url } from "@typedefs/ui/surveyPage.typedefs";
import { BaseDetailsPage } from "@ui/pages/baseDetails.page";
import { foldersUrl } from "src/constants/urls/apiUrls";
import { folderUrl } from "src/constants/urls/uiUrls";

export class FolderDetailsPage extends BaseDetailsPage {
	url = folderUrl.folderDetails;
	readonly backBtn: Locator = this.page.locator(".nav-back");
	readonly folderName: Locator = this.backBtn.locator("span");

	async waitForOpened({ waitForResponse }: Url = {}): Promise<void> {
		await super.waitForOpened();

		waitForResponse &&
		await this.page.waitForResponse(new RegExp(foldersUrl.details));
	}

	async clickBackBtn(): Promise<void> {
		await test.step(`Click [Back] button in folder details page`, async () => {
			await this.backBtn.click();
		});
	}

	async assertFolderNameCorrect(name: string): Promise<void> {
		await test.step(`Assert folder name is correct`, async () => {
			await expect(this.folderName).toHaveText(name);
		});
	}
}