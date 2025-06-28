import { Locator, test, expect, Page } from "@playwright/test";
import { Timeout } from "@typedefs/playwright/service.typedefs";
import { GridActionMenu } from "@ui/components/actions/gridActionMenu";
import { InputWithPlaceholder } from "@ui/components/inputs";
import { GridCol } from "@ui/components/tables/questions/gridCol";

export abstract class BaseGridRow { // TODO: Add implementation for GridRow
	readonly page: Page;

	constructor(readonly container: Locator) {
		this.page = container.page();
	}
}

export class HeadGridRow extends BaseGridRow { // TODO: Add implementation for GridRow
	readonly columns: Locator = this.container.locator(".answer-item");

	nth(index: number): GridCol {
		return new GridCol(this.columns.nth(index));
	}

	async count(options: Timeout = { timeout: 0 }): Promise<number> {
		await this.page.waitForTimeout(options?.timeout);
		return this.columns.count();
	}

	async all(): Promise<GridCol[]> {
		const cols = await this.columns.all();
		return cols.map(col => new GridCol(col));
	}
}

export class GridRow extends BaseGridRow { // TODO: Add implementation for GridRow
	readonly topic: Locator = this.container.locator(".topic-item");
	readonly topicVariable: Locator = this.topic.locator(".var-name");
	readonly topicText: Locator = this.topic.locator(".topic-text");
	readonly options: Locator = this.container.locator("td>input");
	readonly openActionBtn: Locator = this.container.locator(".topic-actions-button button");
	readonly actionMenu: GridActionMenu = new GridActionMenu(this.page);

	async assertTopicText(text: string = "Topic #1"): Promise<void> {
		await test.step(`Assert topic text is "${text}"`, async () => {
			await expect(this.topicText).toHaveText(text);
		});
	}

	async assertTopicVariableText(text: string = "T_1_Q_1"): Promise<void> {
		await test.step(`Assert topic var text is "${text}"`, async () => {
			await expect(this.topicVariable).toHaveText(text);
		});
	}

	async editTopicText(text: string): Promise<void> {
		await test.step(`Edit topic var text to "${text}"`, async () => {
			const input = new InputWithPlaceholder(this.topicText, "Click to write the topic option");
			await input.fill(text);
		});
	}

	async editTopicVarText(text: string): Promise<void> {
		await test.step(`Edit topic var text to "${text}"`, async () => {
			const input = new InputWithPlaceholder(this.topicVariable, "Variable name");
			await input.fill(text);
		});
	}

	async delete(): Promise<void> {
		await test.step(`Delete topic`, async () => {
			expect(async () => {
				await this.openActionBtn.click();
				await this.actionMenu.assertIsVisible();
				await this.actionMenu.clickDeleteBtn();
			}).toPass();
		});
	}
}
