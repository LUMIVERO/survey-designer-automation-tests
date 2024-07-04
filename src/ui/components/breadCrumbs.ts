import { Locator, Page } from "@playwright/test";

export interface BreadCrumbs {
	readonly page: Page;
	readonly container: Locator;
	readonly breadCrumbs: Locator;
	readonly items: Locator;
}

export class FoldersBreadCrumbs implements BreadCrumbs {
	readonly breadCrumbs: Locator = this.container.locator(".breadcrumbs");
	readonly items: Locator = this.breadCrumbs.locator("li");
	readonly page: Page;

	constructor(readonly container: Locator) {
		this.page = container.page();
	}

	async clickOnItemName(name: string): Promise<void> {
		await this.items.filter({ hasText: name }).first().click();
	}

	async clickOnBaseItem(): Promise<void> {
		await this.items.first().click();
	}
}

export class ChapterBreadCrumbs implements BreadCrumbs {
	readonly breadCrumbs: Locator = this.container.locator(".chapter-breadcrumbs");
	readonly items: Locator = this.breadCrumbs.locator(".li");
	readonly page: Page;

	constructor(readonly container: Locator) {
		this.page = container.page();
	}
}