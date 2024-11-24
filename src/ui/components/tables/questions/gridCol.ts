import { Page, Locator, test, expect } from "@playwright/test";
import { GridActionMenu } from "@ui/components/actions/gridActionMenu";

export class GridCol {
	readonly page: Page;
	readonly actionMenu: GridActionMenu;
	readonly ansverVar: Locator = this.container.locator(".var-name");
	readonly openActionBtn: Locator = this.container.locator(".answer-actions-button button");


	constructor(readonly container: Locator) {
		this.page = container.page();
		this.actionMenu = new GridActionMenu(this.page);
	}

	async openActionMenu(): Promise<void> {
		await this.openActionBtn.click();
	}

	async delete(): Promise<void> {
		await test.step("Delete answer", async () => {
			expect(async () => {
				await this.openActionBtn.click();
				await this.actionMenu.assertIsVisible();
				await this.actionMenu.clickDeleteBtn();
			}).toPass();
		});
	}
}
