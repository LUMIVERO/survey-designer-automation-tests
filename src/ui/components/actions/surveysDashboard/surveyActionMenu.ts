import { Locator, test } from "@playwright/test";
import { DashboardItemActionMenu } from "@ui/components/actions/surveysDashboard/dashboardItemActionMenu";
import { DialogWithInput } from "@ui/components/dialogs/dialogWithInput";

export class SurveyActionMenu extends DashboardItemActionMenu {
	readonly duplicateBtn: Locator = this.actions.filter({ hasText: "Duplicate" });
	readonly saveInQBankBtn: Locator = this.actions.filter({ hasText: "Save in Qbank" });
	readonly moveBtn: Locator = this.actions.filter({ hasText: "Move" });

	async clickDuplicateButton(): Promise<DialogWithInput> {
		await test.step("Click duplicate btn", async () => {
			await this.duplicateBtn.click();
		});

		return new DialogWithInput(this.page);
	}

	async clickDeleteButton(): Promise<DialogWithInput> {
		await super.clickDeleteButton();

		return new DialogWithInput(this.page);
	}
}