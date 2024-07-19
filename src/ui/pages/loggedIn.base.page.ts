import { test, expect, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export abstract class LoggedInBasePage extends BasePage {
	readonly headerContainer: Locator = this.page.locator(".header-container");
	readonly toolBar: Locator = this.page.locator(".toolbar");
	readonly logo: Locator = this.headerContainer.locator(".brand");
	readonly navigationTabs: Locator = this.headerContainer.locator(".navigation");
	readonly notificationDropdown: Locator = this.toolBar.locator(".notification-dropdown");
	readonly userProfileDropdown: Locator = this.toolBar.locator(".logout-container");
	readonly userInfoBtn: Locator = this.userProfileDropdown.locator(".ti-chevron-down");
	readonly userInfoContainer: Locator = this.userProfileDropdown.locator(".logout-userinfo-container");
	readonly userName: Locator = this.userInfoContainer.locator(".name");
	readonly userEmail: Locator = this.userInfoContainer.locator(".email");
	readonly signOutBtn: Locator = this.userInfoContainer.locator(".logout-userinfo-signout");
	readonly emptyState: Locator = this.page.locator(".surveys-list-empty-state");

	async clickUserInfoDetailsBtn(open: boolean = true): Promise<void> {
		await test.step(`${open ? "Open" : "Close"} user info details`, async () => {
			await this.userInfoBtn.click();
			await this.userInfoContainer.waitFor({ state: `${open ? "visible" : "hidden"}` });
		});
	}

	async assertUsername(username: string): Promise<void> {
		await test.step("Assert username", async () => {
			expect(await this.userName.innerText()).toEqual(username);
		});
	}

	async clickSignOutBtn(): Promise<void> {
		await test.step("Click [Sign out] button", async () => {
			await this.signOutBtn.click();

		});
	}

	async signOut(): Promise<void> {
		await test.step("Sign out user", async () => {
			await this.clickUserInfoDetailsBtn();
			await this.clickSignOutBtn();
		});
	}

	async assertEmptyStateIsDisplayed(): Promise<void> {
		await test.step("Assert empty state is displayed", async () => {
			await this.emptyState.waitFor({ state: "visible" });
			expect(await this.emptyState.innerText()).toContain("There are no items.");
		});
	}
}