import { Locator, test } from "@playwright/test";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class DashboardRowActionMenu extends BaseActionMenuPopup {
	readonly deleteBtn: Locator = this.actions.filter({ hasText: "Delete" });
	readonly duplicateBtn: Locator = this.actions.filter({ hasText: "Duplicate" });

	async clickDeleteButton(): Promise<void> {
		await test.step("Click delete btn", async () => {
			await this.deleteBtn.click();
		});
	}

	async clickDuplicateButton(): Promise<void> {
		await test.step("Click duplicate btn", async () => {
			await this.duplicateBtn.click();
		});
	}
}