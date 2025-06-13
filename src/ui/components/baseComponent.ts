import { Page, Locator, expect } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";

export abstract class BaseComponent {
	constructor(protected readonly page: Page) {
	}
}

export abstract class BaseContainer {
	protected page: Page;
	protected container: Locator;

	protected constructor(container: Locator) {
		this.container = container;
		this.page = container.page();
	}

	async assertIsVisible(options?: AssertIsVisible): Promise<void> {
		await expect(this.container).toBeVisible(options);
	}
}