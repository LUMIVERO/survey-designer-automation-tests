import { surveysUrl } from "src/constants/urls/apiUrls";
import { surveyUrl } from "src/constants/urls/uiUrls";
import { expect, Locator, test } from "@playwright/test";
import { Url } from "@typedefs/ui/surveyPage.typedefs";
import { BaseDetailsPage } from "../baseDetails.page";

export class SurveyDetailsPage extends BaseDetailsPage {
	url = surveyUrl.surveysDetails;
	readonly pageContentHeader: Locator = this.page.locator(".page-content-header");
	readonly surveyName: Locator = this.pageContentHeader.locator(".title");

	async waitForOpened(options?: Url): Promise<void> {
		const { url, waitForResponse } = options ?? {};
		await super.waitForOpened({ url });

		waitForResponse &&
		await this.page.waitForResponse(new RegExp(surveysUrl.survey));
	}

	async assertSurveyNameCorrect(name: string): Promise<void> {
		await test.step(`Assert survey name is correct`, async () => {
			await expect(this.surveyName).toHaveText(name);
		});
	}
}