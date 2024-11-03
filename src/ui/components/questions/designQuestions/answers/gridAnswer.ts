import { Locator, test, expect } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";
import { GridTable } from "@ui/components/tables/questions/gridTable";

export class GridAnswer extends BaseAnswer {
	readonly table: GridTable = new GridTable(this.page.locator("table.grid"));
	readonly input: Locator = this.table.getRow().options.first();

	async getAnswerVariableText(): Promise<string> {
		return await this.answerVariable.first().innerText();
	}

	async getAnswerText(): Promise<string> {
		return await this.answerTextInput.first().innerText();
	}

	async assertInputType(): Promise<void> {
		await test.step("Assert input type is grid table", async () => {
			await this.table.assertIsVisible();
			expect(await this.input.getAttribute("type")).toEqual("checkbox");
		});
	}

	async editAnswerText(text: string): Promise<GridAnswer> {
		await super.editAnswerText(text);

		return new GridAnswer(this.page.locator(this._answerLocator, { hasText: text }));
	}

	async editAnswerVarText(text: string): Promise<GridAnswer> {
		await super.editAnswerVarText(text);

		return new GridAnswer(this.page.locator(this._answerLocator, { hasText: text }));
	}
}
