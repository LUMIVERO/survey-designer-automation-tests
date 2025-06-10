import { Locator, Page } from "@playwright/test";

export class FoldersBreadCrumbs {
	readonly container: Locator = this.page.locator(".breadcrumbs");
	readonly items: Locator = this.container.locator(".k-breadcrumb-item");

	constructor(readonly page: Page) {
	}

	get rootItem(): Locator {
		return this.page.locator(".k-breadcrumb-root-item");
	}

	get areaItem(): Locator {
		return this.items.nth(1);
	}

	get mainItem(): Locator {
		return this.items.nth(2);
	}

	async clickOnItemName(name: string): Promise<void> {
		await this.items.filter({ hasText: name }).locator("a").click();
	}

	async clickOnRootItem(): Promise<void> {
		await this.rootItem.locator("a").click();
	}

	async clickOnBaseItem(): Promise<void> {
		await this.mainItem.locator("a").click();
	}
}
