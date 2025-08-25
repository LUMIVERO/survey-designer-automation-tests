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

	async assertInputType(options: { type: "radio" | "checkbox" }): Promise<void> {
		await test.step("Assert input type is grid table", async () => {
			await this.table.assertIsVisible();
			expect(await this.input.getAttribute("type")).toEqual(options.type);
		});
	}
}
