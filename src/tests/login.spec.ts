import { test, BrowserContext } from "@playwright/test";
import { Application } from "../ui/pages/application";

test.describe("Authentication", () => {
	let APP: Application;
	let context: BrowserContext;

	test.beforeAll(async ({ browser }) => {
		context = await browser.newContext();
		const page = await context.newPage();
		APP = new Application(page);
	});

	test("User is able to log in and log out", async () => {
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
