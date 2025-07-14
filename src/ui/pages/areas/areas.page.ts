import { Locator, test, expect } from "@playwright/test";
import { AreaParams } from "@typedefs/ui/areas.typedefs";
import { LoggedInBasePage } from "@ui/pages/loggedIn.base.page";
import { string } from "casual";
import { areasUrl } from "src/constants/urls/uiUrls";

export class AreasPage extends LoggedInBasePage {
	url = areasUrl.root;
	readonly areas: Locator = this.page.locator(".area-list-item");
	readonly params: Locator = this.page.locator(".params-item");

	async clickArea(name: string): Promise<void> {
		await test.step(`Click on area ${name}`, async () => {
			await this.areas.filter({ hasText: name }).click();
		});
	}

	async assertAreaParams(areaName: string, params: AreaParams): Promise<void> {
		await test.step(`Assert area ${areaName} params`, async () => {
			const area = this.areas.filter({ hasText: string });
			const areaParams = area.locator(this.params);

			await Promise.all([
				params.surveys ?? expect(areaParams.nth(0)).toContainText(`${params.surveys}`),
				params.waves ?? expect(areaParams.nth(1)).toContainText(`${params.waves}`),
				params.users ?? expect(areaParams.nth(2)).toContainText(`${params.users}`),
			].filter(Boolean));
		});
	}
}