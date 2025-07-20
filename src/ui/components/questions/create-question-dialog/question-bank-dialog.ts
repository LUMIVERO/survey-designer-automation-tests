import { Page, Locator } from "@playwright/test";
import { BaseContainer } from "@ui/components/baseComponent";
import { CreateQuestionDialogHeader } from "./create-question-dialog-header";

export class QuestionBankDialog extends BaseContainer {
	readonly search: Locator = this.container.locator(".search-box input");

	readonly header: CreateQuestionDialogHeader = new CreateQuestionDialogHeader(this.page);

	constructor(page: Page) {
		super(page.locator(".qbank-questions-filters-widget"));
	}
}