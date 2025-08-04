import { Locator, test } from "@playwright/test";
import { BaseSidePanelItem } from "@ui/components/surveys/sidePanel/items/baseSidePanelItem";
import { AddNewItemSidebarMenu } from "src/ui/components/surveys/sidePanel/actions";

export class SidePanelChapter extends BaseSidePanelItem {
	readonly title: Locator = this.container.locator(".chapter [title]");
	readonly addNewBtn: Locator = this.container.locator("button", { has: this.page.locator(".ti-plus") });
	readonly expandBtn: Locator = this.container.locator(".ti-triangle-inverted-filled");
	protected addNewItemSidebarPopup = new AddNewItemSidebarMenu(this.page);

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

	async expand(): Promise<void> {
		await test.step("Expand chapter", async () => {
			if (await this.expandBtn.getAttribute("class").then(classString => classString.includes("collapsed"))) {
				return this.expandBtn.click();
			}
		});
	}

	async assertChapterName(name: string): Promise<void> {
		await this.assertItemName(name, "chapter");
	}

	private async getSubChapters(): Promise<Locator> {
		return this.page.locator(`[data-parent-id="${await this.getItemId()}"]`);
	}
}
