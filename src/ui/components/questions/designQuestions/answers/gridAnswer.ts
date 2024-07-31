import { Locator, test, expect } from "@playwright/test";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";
import { GridTable } from "@ui/components/tables/questions/gridTable";

export class GridAnswer extends BaseAnswer {
	readonly table: GridTable = new GridTable(this.container.locator("table"));
	readonly input: Locator = this.table.getRow().options.first();

	constructor(container: Locator) {
		super(container.page().locator(".answers"));
	}

	async getAnswerVariableText(): Promise<string> {
		return await this.answerVariable.first().inputValue();
	}

	async getAnswerText(): Promise<string> {
		return await this.answerTextInput.first().inputValue();
	}

	async assertInputType(): Promise<void> {
		await test.step("Assert input type is grid table", async () => {
			await this.table.assertIsVisible();
			expect(await this.input.getAttribute("type")).toEqual("checkbox");
		});
	}
}