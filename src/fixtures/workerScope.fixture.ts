import { BrowserContext, test as base } from "@playwright/test";
import { adminAuthFile } from "../data/authPath.data";
import { getTokenFromFile } from "../helpers/apiHelpers";

export const test = base.extend<{}, {
	adminContext: BrowserContext;
}>({
	adminContext: [async ({ browser }, use) => {
		const token = await getTokenFromFile(adminAuthFile);
		const context = await browser.newContext({
			storageState: adminAuthFile,
			extraHTTPHeaders: {
				"Authorization": token
			}
		});
		await use(context);
		await context.close();
	}, { scope: "worker" }],
});