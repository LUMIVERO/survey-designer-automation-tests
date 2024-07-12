import { ApiApplication } from "@api/apiApplication";
import { BrowserContext, test as base } from "@playwright/test";
import { adminAuthFile } from "@data/authPath.data";
import { getTokenFromFile } from "@helpers/api.helpers";

export const test = base.extend<{}, {
	adminContext: BrowserContext;
	apiService: ApiApplication;
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
	apiService: [async ({ adminContext }, use) => {
		const apiService = new ApiApplication(adminContext.request);
    await use(apiService);
	}, { scope: "worker"}]
});