import { Locator, expect, test } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { DashboardRowActionMenu } from "@ui/components/actions/dashboardRowActionMenu";
import { BaseContainer } from "@ui/components/baseComponent";

export class Chapter extends BaseContainer {
	static defaultChapterName = "Chapter #1";
	private _chaptersLocator: string = ".chapter-container";
	readonly title: Locator = this.container.locator(".title");
	readonly commentsBtn: Locator = this.container.getByTitle("Start discussion");
	readonly actions: Locator = this.container.locator(".dropdown-button-container button");
	readonly actionsMenu: DashboardRowActionMenu = new DashboardRowActionMenu(this.page);

	constructor(container: Locator) {
		super(container);
	}

	async renameChapter(name: string): Promise<Chapter> {
		return await test.step("Rename Chapter", async () => {
			await this.title.click();
			const titleInput = this.page.getByPlaceholder("Click to write the chapter title");
			await titleInput.fill(name);
			await this.removeFocusWithTab();
			await expect(titleInput).toBeHidden();

			this.container = this.page.locator(this._chaptersLocator).filter({ hasText: name });
			return this;
		});
	}

	async removeFocusWithTab(): Promise<void> {
		await test.step("Click out of focus", async () => {
			await this.page.keyboard.press("Tab");
		});
	}

	async clickThreeDotsBtn(): Promise<DashboardRowActionMenu> {
		await test.step("Click on tree dots button", async () => {
			await this.actions.click();
			await this.actionsMenu.waitFor({ state: "attached" });
		});

		return this.actionsMenu;
	}

	async assertChapterIsVisible(options: AssertIsVisible = { visible: true }): Promise<void> {
		await test.step(`Assert chapter is ${options.visible ? "not " : ""} visible`, async () => {
			await expect(this.container).toBeVisible(options);
		});
	}
}
