import { Page, test, expect } from "@playwright/test";

export abstract class BasePage {
	abstract url: string;

	constructor(readonly page: Page) {
	};

	async visit(url?: string): Promise<void> {
		await test.step(`Visit '${url ?? this.url}' page`, async () => {
			await this.goto(url ?? this.url);
			await this.waitForOpened(url ?? this.url);
		});
	}

	async goto(url?: string): Promise<void> {
		await test.step(`Go to '${url ?? this.url}' page `, async () => {
			await this.page.goto(url ?? this.url);
		});
	}

	async assertIsOpened(url?: string | RegExp): Promise<void> {
		expect(this.page.url()).toMatch(new RegExp(url ?? this.url));
	}

	async waitForOpened(url?: string | RegExp): Promise<void> {
		await this.page.waitForURL(new RegExp(url ?? this.url));
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