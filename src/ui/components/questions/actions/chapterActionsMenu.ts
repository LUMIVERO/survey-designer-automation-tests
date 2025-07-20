import { Locator, test } from "@playwright/test";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class ChapterActionsMenu extends BaseActionMenuPopup {
	readonly deleteBtn: Locator = this.actions.filter({ hasText: "Delete" });
	readonly saveInQBankBtn: Locator = this.actions.filter({ has: this.page.locator(".ti-building-bank") });

	async clickDeleteButton(): Promise<void> {
		await test.step("Click delete btn", async () => {
			await this.deleteBtn.click();
		});
	}

	async clickSaveInQBank(): Promise<void> {
		await test.step("Click duplicate btn", async () => {
			await this.saveInQBankBtn.click();
		});
	}
}