import { Locator, test, expect } from "@playwright/test";
import { BaseContainer } from "@ui/components/baseComponent";
import { AddNewItemSidebarMenu, SidebarActionsMenu } from "./actions";

export class SidePanelChapter extends BaseContainer {
	readonly title: Locator = this.container.locator(".chapter [title]");
	readonly addNewBtn: Locator = this.container.locator("button", { has: this.page.locator(".ti-plus") });
	readonly threeDotsBtn: Locator = this.container.locator("button", { has: this.page.locator(".ti-dots-vertical") });
	readonly expandBtn: Locator = this.container.locator(".ti-triangle-inverted-filled");
	protected addNewItemSidebarPopup = new AddNewItemSidebarMenu(this.page);
	protected actionsMenu = new SidebarActionsMenu(this.page);

	constructor(container: Locator) {
		super(container);
	}

	async getSubChapter(name: string): Promise<SidePanelChapter> {
		const locator = await this.getSubChapters()
			.then(chapters => chapters.filter({ hasText: name }));

		return new SidePanelChapter(locator);
	}

	async clickAddNewBtn(): Promise<AddNewItemSidebarMenu> {
		return test.step("Click on the [Add new] btn on side panel chapter", async () => {
			await this.container.hover();
			await this.addNewBtn.click();
			await this.addNewItemSidebarPopup.waitFor({ state: "attached" });

			return this.addNewItemSidebarPopup;
		});
	}

	async clickThreeDotsBtn(): Promise<SidebarActionsMenu> {
		await test.step("Click on tree dots button", async () => {
			await this.container.hover();
			await this.threeDotsBtn.click();
			await this.actionsMenu.waitFor({ state: "attached" });
		});

		return this.actionsMenu;
	}

	async expand(): Promise<void> {
		await test.step("Expand chapter", async () => {
			if (await this.expandBtn.getAttribute("class").then(classString => classString.includes("collapsed"))) {
				return this.expandBtn.click();
			}
		});
	}

	async assertChapterName(name: string): Promise<void> {
		await test.step("Assert chapter name on side panel", async () => {
			await expect(this.title).toHaveText(name);
		});
	}

	private async getChapterId(): Promise<string> {
		return this.container.getAttribute("data-node-id");
	}

	private async getSubChapters(): Promise<Locator> {
		return this.page.locator(`[data-parent-id="${await this.getChapterId()}"]`);
	}
}
