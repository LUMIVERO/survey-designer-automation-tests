import { surveysUrl } from "src/constants/urls/apiUrls";
import { surveyUrl } from "src/constants/urls/uiUrls";
import { expect, Locator, test } from "@playwright/test";
import { Url } from "@typedefs/ui/surveyPage.typedefs";
import { FoldersBreadCrumbs } from "@ui/components/breadCrumbs";
import { BaseDetailsPage } from "../baseDetails.page";

export class SurveyDetailsPage extends BaseDetailsPage {
	url = surveyUrl.surveysDetails;
	readonly breadCrumbs = new FoldersBreadCrumbs(this.page.locator(".breadcrumbs-wrapper"));
	readonly pageContentHeader: Locator = this.page.locator(".page-content-header");
	readonly surveyName: Locator = this.pageContentHeader.locator(".title");

	async waitForOpened(options?: Url): Promise<void> {
		const { url, waitForResponse = true } = options ?? {};
		await super.waitForOpened({ url });

		waitForResponse &&
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