import { Locator, test, expect, Page } from "@playwright/test";
import { Input } from "@ui/components/input";

export abstract class BaseGridRow { // TODO: Add implementation for GridRow
	readonly page: Page;

	constructor(readonly container: Locator) {
		this.page = container.page();
	}
}

export class HeadGridRow extends BaseGridRow { // TODO: Add implementation for GridRow
}

export class GridRow extends BaseGridRow { // TODO: Add implementation for GridRow
	readonly topic: Locator = this.container.locator(".topic-item");
	readonly topicVariable: Locator = this.topic.locator(".var-name");
	readonly topicText: Locator = this.topic.locator(".topic-text");
	readonly options: Locator = this.container.locator("td>locator");

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
			const input = new Input(this.topicText, "Click to write the topic option");
			await input.fill(text);
		});
	}

	async editTopicVarText(text: string): Promise<void> {
		await test.step(`Edit topic var text to "${text}"`, async () => {
			const input = new Input(this.topicVariable, "Variable name");
			await input.fill(text);
		});
	}
}
