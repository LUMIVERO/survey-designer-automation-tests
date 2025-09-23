import { BasePage } from "../base.page";
import { Locator, test } from "@playwright/test";
import { loginUrl } from "src/constants/urls/uiUrls";

export class LoginPage extends BasePage {
	url = loginUrl;
	readonly usernameField: Locator = this.page.locator(".textbox-container", { hasText: "Username" }).locator("input");
	readonly passwordField: Locator = this.page.locator(".textbox-container", { hasText: "Password" }).locator("input");
	readonly tenantField: Locator = this.page.locator(".textbox-container", { hasText: "Organization" }).locator("input");
	readonly submitBtn: Locator = this.page.locator("[type='submit']");

	async login({ username, password, tenant }: Record<string, string>): Promise<void> {
		await test.step("Login user", async () => {
			await this.fillUsername(username);
			await this.fillPassword(password);
			await this.fillTenant(tenant);
			await this.page.waitForTimeout(500);
			await this.clickSubmit();
		});
	}

	async fillUsername(username: string): Promise<void> {
		await test.step("Fill user username", async () => {
			await this.usernameField.fill(username);
		});
	}

	async fillTenant(tenant: string): Promise<void> {
		await test.step("Fill user tenant", async () => {
			await this.tenantField.fill(tenant);
		});
	}

	async fillPassword(password: string): Promise<void> {
		await test.step("Fill user password", async () => {
			await this.passwordField.fill(password);
		});
	}

	async clickSubmit(): Promise<void> {
		await test.step("Click [Submit]", async () => {
			await this.submitBtn.click();
		});
	}
}