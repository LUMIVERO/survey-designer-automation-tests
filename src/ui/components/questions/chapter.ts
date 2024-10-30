import { Locator, Page, expect, test } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { ActionMenuPopup } from "@ui/components/actionPopup";

export class Chapter {
	private _chaptersLocator: string = ".chapter-container";
	readonly title: Locator = this.container.locator(".title");
	readonly commentsBtn: Locator = this.container.getByTitle("Start discussion");
	readonly actions: Locator = this.container.locator(".dropdown-button-container button");
	readonly actionsMenu: ActionMenuPopup = new ActionMenuPopup(this.page);

	constructor(readonly container: Locator) {
	}

	get page(): Page {
		return this.container.page();
	}

	async renameChapter(name: string): Promise<Chapter> {
		return await test.step("Rename Chapter", async () => {
			await this.title.click();
			const titleInput = this.page.getByPlaceholder("Click to write the chapter title");
			await titleInput.fill(name);
			await this.removeFocusWithTab();
			await expect(titleInput).toBeHidden();

			return new Chapter(this.page.locator(this._chaptersLocator).filter({ hasText: name }));
		});
	}

	async removeFocusWithTab(): Promise<void> {
		await test.step("Click out of focus", async () => {
			await this.page.keyboard.press("Tab");
		});
	}

	async clickTreeDotsBtn(): Promise<void> {
		await test.step("Click on tree dots button", async () => {
			await this.actions.click();
		});
	}

	async assertChapterIsVisible(options: AssertIsVisible = { visible: true }): Promise<void> {
		await test.step(`Assert chapter is ${options.visible ? "not " : ""} visible`, async () => {
			await expect(this.container).toBeVisible(options);
		});
	}
}
