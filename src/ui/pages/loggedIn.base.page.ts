import { test, expect, Locator } from "@playwright/test";
import { UserInfoTab } from "@ui/components/userInfoTab";
import { BasePage } from "./base.page";

export abstract class LoggedInBasePage extends BasePage {
	readonly headerContainer: Locator = this.page.locator(".header-container");
	readonly toolBar: Locator = this.page.locator(".toolbar");
	readonly logo: Locator = this.headerContainer.locator(".brand");
	readonly navigationTabs: Locator = this.headerContainer.locator(".navigation");
	readonly notificationDropdown: Locator = this.toolBar.locator(".notification-dropdown");
	readonly userInfoBtn: Locator = this.toolBar.locator(".profile-btn");
	readonly emptyState: Locator = this.page.locator(".surveys-list-empty-state");

	readonly userInfoTab = new UserInfoTab(this.page);

	async clickUserInfoDetailsBtn(): Promise<void> {
		await test.step(`Click user info details`, async () => {
			await this.userInfoBtn.click();
		});
	}

	async signOut(): Promise<void> {
		await test.step("Sign out user", async () => {
			await this.clickUserInfoDetailsBtn();
			await this.userInfoTab.clickSignOutBtn();
		});
	}

	async assertEmptyStateIsDisplayed(): Promise<void> {
		await test.step("Assert empty state is displayed", async () => {
			await this.emptyState.waitFor({ state: "visible" });
			expect(await this.emptyState.innerText()).toContain("There are no items.");
		});
	}
}