import { test as base } from "./workerScope.fixture";
import { Application } from "@ui/application";

export const test = base.extend<{
	adminAPP: Application;
}>({
	adminAPP: async ({ adminContext }, use) => {
		const page = await adminContext.newPage();
		const adminAPP = new Application(page);
		await use(adminAPP);
	}
});