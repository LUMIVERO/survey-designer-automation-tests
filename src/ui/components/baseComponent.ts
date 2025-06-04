import { Page, Locator } from "@playwright/test";

export abstract class BaseComponent {
	constructor(protected readonly page: Page) {
	}
}

export abstract class BaseContainer {
	protected page: Page;

	protected constructor(protected container: Locator) {
		this.page = container.page();
	}
}