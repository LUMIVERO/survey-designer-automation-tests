import { Locator, test } from "@playwright/test";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class DashboardItemActionMenu extends BaseActionMenuPopup {
	readonly deleteBtn: Locator = this.actions.filter({ hasText: "Delete" });

	async clickDeleteButton(): Promise<any> {
		await test.step("Click delete btn", async () => {
			await this.deleteBtn.click();
		});
	}
}