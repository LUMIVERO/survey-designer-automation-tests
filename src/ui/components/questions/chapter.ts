import { Locator, expect, test } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { DashboardRowActionMenu } from "@ui/components/actions/dashboardRowActionMenu";
import { BaseContainer } from "@ui/components/baseComponent";
import { RichTextEditor } from "@ui/components/dialogs/richTextEditor";
import { Input } from "@ui/components/inputs";

export class Chapter extends BaseContainer {
	static defaultChapterName = "Chapter #1";
	private _chaptersLocator: string = ".chapter-container";
	readonly title: Locator = this.container.locator(".title");
	readonly titleInput: Input = new Input(this.title);
	readonly commentsBtn: Locator = this.container.getByTitle("Start discussion");
	readonly actions: Locator = this.container.locator(".dropdown-button-container button");
	readonly editBtn: Locator = this.container.locator(".edit-button");

	readonly actionsMenu: DashboardRowActionMenu = new DashboardRowActionMenu(this.page);
	private readonly editTextDialog: RichTextEditor = new RichTextEditor(this.page);

	constructor(container: Locator) {
		super(container);
	}

	async renameChapter(name: string): Promise<Chapter> {
		return await test.step("Rename Chapter", async () => {
			await this.titleInput.fill(name);

			return new Chapter(this.page.locator(this._chaptersLocator).filter({ hasText: name }));
		});
	}


	async clickThreeDotsBtn(): Promise<DashboardRowActionMenu> {
		await test.step("Click on tree dots button", async () => {
			await this.actions.click();
			await this.actionsMenu.waitFor({ state: "attached" });
		});

		return this.actionsMenu;
	}

	async clickEditBtn(): Promise<RichTextEditor> {
		await test.step("Click edit text", async () => {
			await this.title.hover();
			await expect(this.editBtn).toBeVisible();
			await this.editBtn.click();
		});

		return this.editTextDialog;
	}

	async assertChapterIsVisible(options: AssertIsVisible = { visible: true }): Promise<void> {
		await test.step(`Assert chapter is ${options.visible ? "not " : ""} visible`, async () => {
			await expect(this.container).toBeVisible(options);
		});
	}

	async assertChapterName(name: string): Promise<void> {
		await test.step("Assert chapter name", async () => {
			await expect(this.title).toHaveText(name);
		});
	}
}
