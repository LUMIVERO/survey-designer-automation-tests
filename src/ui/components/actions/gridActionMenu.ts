import { Locator, expect } from "@playwright/test";
import { AssertIsVisible } from "@typedefs/playwright/expect.typedefs";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class GridActionMenu extends BaseActionMenuPopup {

	readonly addBtn: Locator = this.actions.filter({ has: this.page.locator(".ti-plus") });
	readonly deleteBtn: Locator = this.actions.filter({ has: this.page.locator(".ti-trash") });

	async clickDeleteBtn(): Promise<void> {
		await this.deleteBtn.click();
	}

	async clickAddNewBtn(): Promise<void> {
		await this.addBtn.click();
	}

	async assertIsVisible(options?: AssertIsVisible): Promise<void>;
	async assertIsVisible(action: "delete" | "add", options?: AssertIsVisible): Promise<void>;
	async assertIsVisible(actionOrOptions?: string | AssertIsVisible, options?: AssertIsVisible): Promise<void> {
		if (typeof actionOrOptions === "string") {
			return expect(this[`${actionOrOptions}Btn`]).toBeVisible(options);
		}

		return super.assertIsVisible(actionOrOptions);
	}
}
