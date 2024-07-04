import { surveyUrl } from "../../../data/urls/uiUrls";
import { BaseDetailsPage } from "../baseDetails.page";
import { surveysUrl } from "../../../data/urls/apiUrls";
import { expect, Locator, test } from "@playwright/test";
import { FoldersBreadCrumbs } from "../../components/breadCrumbs";

export class SurveyDetailsPage extends BaseDetailsPage {
	url = surveyUrl.surveysDetails;
	readonly breadCrumbs = new FoldersBreadCrumbs(this.page.locator(".breadcrumbs-wrapper"));
	readonly pageContentHeader: Locator = this.page.locator(".page-content-header");
	readonly surveyName: Locator = this.pageContentHeader.locator(".title");

	async waitForOpened(url?: string | RegExp): Promise<void> {
		await super.waitForOpened(url);
		await this.page.waitForResponse(new RegExp(surveysUrl.survey));
	}

	async assertSurveyNameCorrect(name: string): Promise<void> {
		await test.step(`Assert survey name is correct`, async () => {
			await expect(this.surveyName).toHaveText(name);
		});
	}

	async clickMainFolderInBreadCrumbs(): Promise<void> {
		await test.step("Click All in folder breadcrumbs", async () => {
			await this.breadCrumbs.clickOnBaseItem();
		});
	}
}