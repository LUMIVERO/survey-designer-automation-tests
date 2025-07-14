import { test } from "@playwright/test";
import { Application } from "@ui/application";
import { ADMIN_CREDS, testArea1 } from "src/constants/env.data";

test.describe("Authentication @Sc80b4b04", () => {
	test("User is able to log in and log out @Tebe222e4", async ({ page }) => {
		const APP = new Application(page);

		await APP.loginPage.visit();
		await APP.loginPage.login(ADMIN_CREDS);
  	await APP.areasPage.waitForOpened();
		await APP.areasPage.clickUserInfoDetailsBtn();
		await APP.areasPage.userInfoTab.assertUserInfo(ADMIN_CREDS);
		await APP.areasPage.userInfoTab.assertAreaIsVisible(testArea1.name);
		await APP.areasPage.userInfoTab.clickSignOutBtn();
		await APP.loginPage.waitForOpened();
	});
});
