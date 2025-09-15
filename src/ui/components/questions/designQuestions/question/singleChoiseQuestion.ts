import { Question } from "./question";
import { DropdownAddBnt } from "../elements/dropdownAddBnt";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

export class SingleChoiceQuestion extends Question {
	readonly addNewAnswerBtn = new DropdownAddBnt(this.container);


	async assertQuestionType(questionType: QuestionType): Promise<void> {
		await super.assertQuestionType(questionType);
		await this.addNewAnswerBtn.assertIsVisible();
	}
}