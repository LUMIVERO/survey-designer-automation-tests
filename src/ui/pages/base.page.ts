import { test, expect } from "@playwright/test";
import { BaseComponent } from "@ui/components/baseComponent";

export abstract class BasePage extends BaseComponent {
	abstract url: string;

	async visit(): Promise<void> {
		await test.step(`Visit '${this.url}' page`, async () => {
			await this.page.goto(this.url);
			await this.waitForOpened();
		});
	}

	async assertIsOpened(): Promise<void> {
		expect(this.page.url()).toMatch(new RegExp(this.url));
	}

	async waitForOpened(): Promise<void> {
		await this.page.waitForURL(new RegExp(this.url));
	}

	async reload(): Promise<void> {
		await test.step(`Reload ${this.url} page`, async () => {
			await this.page.reload();
			await this.waitForOpened();
		});
	}

	async pressKeyboardEnter(delay = 0): Promise<void> {
		await test.step(`Press [Enter]`, async () => {
			await this.page.keyboard.press("Enter", { delay });
		});
	}
}