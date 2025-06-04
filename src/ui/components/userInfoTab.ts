import { Page, Locator, test, expect } from "@playwright/test";
import { UserInfoTabData } from "@typedefs/ui/basePage.typedefs";
import { BaseContainer } from "@ui/components/baseComponent";

export class UserInfoTab extends BaseContainer {
	readonly userName: Locator = this.container.locator(".name");
	readonly userEmail: Locator = this.container.locator(".email");
	private readonly _currentArea: Locator = this.page.locator(".current-area");
	readonly areas: Locator = this.container.locator(".area-item");
	readonly signOutBtn: Locator = this.container.locator(".logout-btn");

	constructor(page: Page) {
		super(page.locator(".popover-container", { has: page.locator(".logout-btn") }));
	}

	async assertUserInfo({ username, email }: Partial<UserInfoTabData>): Promise<void> {
		await test.step("Assert user user info", async () => {
			username && await expect.soft(this.userName).toHaveText(username);
			email && await expect.soft(this.userEmail).toHaveText(email);
		});
	}

	async assertMainArea(area: string): Promise<void> {
		await test.step("Assert main area", async () => {
			await expect(this.areas.filter({ has: this._currentArea })).toContainText(area);
		});
	}

	async clickSignOutBtn(): Promise<void> {
		await test.step("Click [Sign out] button", async () => {
			await this.signOutBtn.click();
		});
	}
}