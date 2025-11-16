import { BaseQuestion } from "./baseQuestion";
import { DropdownAddBnt } from "../elements/dropdownAddBnt";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

export class SingleChoiceQuestion extends BaseQuestion {
	readonly addNewAnswerBtn = new DropdownAddBnt(this.container, "add-answer-btn");


	async assertQuestionType(questionType: QuestionType): Promise<void> {
		await super.assertQuestionType(questionType);
		await this.addNewAnswerBtn.assertIsVisible();
	}
}