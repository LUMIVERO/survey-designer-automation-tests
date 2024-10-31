import { test, BrowserContext } from "@playwright/test";
import { Application } from "@ui/application";

test.describe("Authentication", () => {
	test("[48442] User is able to log in and log out", async ({ page }) => {
		const APP = new Application(page);

		const username: string = process.env.USERNAME_ADMIN;
		await APP.loginPage.visit();
		await APP.loginPage.login({
			username,
			password: process.env.PASSWORD_ADMIN,
			tenant: process.env.TENANT1
		});
		await APP.surveysPage.waitForOpened();
		await APP.surveysPage.clickUserInfoDetailsBtn();
		await APP.surveysPage.assertUsername(username);

		await APP.surveysPage.clickSignOutBtn();
		await APP.loginPage.waitForOpened();
	});
});
