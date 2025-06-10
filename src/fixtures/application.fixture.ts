import { Application } from "@ui/application";
import { test as base } from "./workerScope.fixture";

export const test = base.extend<{
	adminAPP: Application;
}>({
	adminAPP: async ({ adminContext }, use) => {
		const page = await adminContext.newPage();
		const adminAPP = new Application(page);
		await use(adminAPP);
		await page.close();
	},
});