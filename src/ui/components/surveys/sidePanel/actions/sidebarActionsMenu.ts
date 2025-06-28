import { Locator, test } from "@playwright/test";
import { Locators } from "@typedefs/common/main.typedefs";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class SidebarActionsMenu extends BaseActionMenuPopup {
	readonly deleteBtn: Locator = this.actions.filter({ has: this.page.locator(".ti-trash") });
	readonly saveInQbank: Locator = this.actions.filter({ has: this.page.locator(".ti-building-bank") });

	async clickActionBtn(option: Locators<SidebarActionsMenu>): Promise<void> {
		await test.step(`Click ${option}`, async () => {
			await this[option].click();
		});
	}
}