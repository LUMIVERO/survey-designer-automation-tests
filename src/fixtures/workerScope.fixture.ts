import { BrowserContext, test as base } from "@playwright/test";
import { adminAuthFile } from "../data/authPath.data";

export const test = base.extend<{}, {
	adminContext: BrowserContext;
}>({
	adminContext: [async ({ browser }, use) => {
		const context = await browser.newContext({ storageState: adminAuthFile });
		await use(context);
		await context.close();
	}, { scope: "worker" }],
});