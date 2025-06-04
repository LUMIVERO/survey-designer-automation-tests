import { test, expect } from "@playwright/test";
import { Url } from "@typedefs/ui/basePage.typedefs";
import { BaseComponent } from "@ui/components/baseComponent";

export abstract class BasePage extends BaseComponent {
	abstract url: string;

	async visit(url?: string): Promise<void> {
		url = url ?? this.url;

		await test.step(`Visit '${url}' page`, async () => {
			await this.goto(url);
			await this.waitForOpened({ url });
		});
	}

	async goto(url?: string): Promise<void> {
		url = url ?? this.url;

		await test.step(`Go to '${url}' page `, async () => {
			await this.page.goto(url);
		});
	}

	async assertIsOpened(url?: string | RegExp): Promise<void> {
		url = url ?? this.url;
		expect(this.page.url()).toMatch(new RegExp(url));
	}

	async waitForOpened(options?: Url): Promise<void> {
		const url = options?.url ?? this.url;
		await this.page.waitForURL(new RegExp(url));
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