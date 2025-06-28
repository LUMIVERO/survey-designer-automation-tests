import { Locator } from "@playwright/test";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class ChapterActionMenu extends BaseActionMenuPopup {
	readonly deleteBtn: Locator = this.actions.filter({ hasText: "Delete" });

	async clickDeleteBtn(): Promise<void> {
		await this.deleteBtn.click();
	}
}
