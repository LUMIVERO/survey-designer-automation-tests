import { test } from "@playwright/test";
import { Application } from "@ui/application";
import { ADMIN_CREDS, testArea1 } from "src/constants/env.data";

test.describe("Authentication", () => {
	test("[48442] User is able to log in and log out", async ({ page }) => {
		const APP = new Application(page);

		await APP.loginPage.visit();
		await APP.loginPage.login(ADMIN_CREDS);
		await APP.surveysPage.waitForOpened();
		await APP.surveysPage.clickUserInfoDetailsBtn();
		await APP.surveysPage.userInfoTab.assertUserInfo(ADMIN_CREDS);
		await APP.page.pause();
		await APP.surveysPage.userInfoTab.assertMainArea(testArea1.name);
		await APP.surveysPage.userInfoTab.clickSignOutBtn();
		await APP.loginPage.waitForOpened();
	});
});
