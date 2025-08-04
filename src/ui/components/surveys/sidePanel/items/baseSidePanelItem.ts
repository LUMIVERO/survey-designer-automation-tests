import { Locator, test, expect } from "@playwright/test";
import { BaseContainer } from "@ui/components/baseComponent";
import { SidebarActionsMenu } from "@ui/components/surveys/sidePanel/actions";

export abstract class BaseSidePanelItem extends BaseContainer {
	abstract title: Locator;
	readonly threeDotsBtn: Locator = this.container.locator("button", { has: this.page.locator(".ti-dots-vertical") });
	protected actionsMenu = new SidebarActionsMenu(this.page);

	constructor(container: Locator) {
		super(container);
	}

	async clickThreeDotsBtn(): Promise<SidebarActionsMenu> {
		await test.step("Click on tree dots button", async () => {
			await this.container.hover();
			await this.threeDotsBtn.click();
			await this.actionsMenu.waitFor({ state: "attached" });
		});

		return this.actionsMenu;
	}


	async assertItemName(name: string, type?: "question" | "chapter"): Promise<void> {
		await test.step(`Assert ${type ?? "item"} name on side panel`, async () => {
			await expect(this.title).toHaveText(name);
		});
	}

	protected async getItemId(): Promise<string> {
		return this.container.getAttribute("data-node-id");
	}
}