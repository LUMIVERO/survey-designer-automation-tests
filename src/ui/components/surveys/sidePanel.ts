import { Locator, Page, test, expect } from "@playwright/test";
import { boolean } from "casual";

export class SidePanelChapter {
	readonly title: Locator = this.container.locator("span.chapter");
	readonly addNewBtn: Locator = this.container.locator("button");

	constructor(readonly container: Locator) {
	}

	async clickAddNewBtn(): Promise<void> {
		await test.step("Click on the [Add new] btn on side panel chapter", async () => {
			await this.addNewBtn.click();
		});
	}
}

export class SidePanel {
	readonly container: Locator = this.page.locator(".tree-view-panel");
	readonly sidePanelBtn: Locator = this.container.locator(".expander-button");

	constructor(readonly page: Page) {
	}

	get chapters(): { rootChapter: Locator; allChapters: Locator } {
		const chaptersSelector = ".treeview-chapter";
		return {
			rootChapter: this.container.locator(`.k-treeview-top${chaptersSelector}`),
			allChapters: this.container.locator(chaptersSelector),
		};
	}

	getChapter(name?: string): SidePanelChapter {
		if (!name) {
			return new SidePanelChapter(this.chapters.rootChapter);
		}
		return new SidePanelChapter(this.chapters.allChapters.filter({ hasText: name }));
	}

	async assertSidePanelIsVisible({ visible = true } = { visible: boolean }): Promise<void> {
		await test.step(`Assert side panel is ${visible ? "" : "not "}visible`, async () => {
			if (visible) {
				await this.container.waitFor({ timeout: 100 });
				await expect(this.container).toHaveClass(/expanded/);
			} else {
				await expect(this.container).not.toHaveClass(/expanded/);
			}
		});
	}
}
