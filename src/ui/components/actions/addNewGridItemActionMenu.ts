import { test } from "@playwright/test";
import { AddGridAnswerOptions, AddGridTopicOptions } from "@typedefs/ui/answer.typedefs";
import { BaseActionMenuPopup } from "@ui/components/actions/baseActionMenu";

export class AddNewGridItemActionMenu extends BaseActionMenuPopup {

	async add(topic: AddGridTopicOptions): Promise<void>;
	async add(answer: AddGridAnswerOptions): Promise<void>
	async add(item: AddGridAnswerOptions | AddGridTopicOptions): Promise<void> {
		await test.step(`Add new ${item}`, async () => {
			await this.actions.filter({ hasText: item }).click();
		});
	}
}