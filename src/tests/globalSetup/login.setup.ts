import { test as setup } from "@playwright/test";
import { Application } from "@ui/application";
import { adminAuthFile } from "../../constants/authPath.data";

setup("Log in to the system", async ({ page }) => {
	const APP = new Application(page);
	await APP.loginPage.visit();

	await APP.loginPage.login({
		username: process.env.USERNAME_ADMIN,
		password: process.env.PASSWORD_ADMIN,
		tenant: process.env.TENANT1,
	});
	await APP.areasPage.waitForOpened();

	await page.context().storageState({ path: adminAuthFile });
});


// TODO: Login setup with api
// setup("Log in to the system api", async ({ context }) => {
//
//   const response = await context.request.post( loginUrl, {
//     data: {
//       tenant: process.env.TENANT1,
//       userName: process.env.USERNAME_ADMIN,
//       password: process.env.PASSWORD_ADMIN,
//       clientId: 'Web'
//     },
//   });
//
//   expect(response.ok()).toBeTruthy();
//   console.log(await response.json())
//
// 	const page = await context.newPage();
// 	const app = new Application(page);
// 	await app.surveysPage.visit()
//
//   await context.storageState({ path: adminAuthFile });
// });
