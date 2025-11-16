import { getAnswerType } from "@helpers/survey.helpers";
import { Locator } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { BaseAnswer } from "@ui/components/questions/designQuestions/answers/baseAnswer";
import { EmptyQuestion } from "@ui/components/questions/designQuestions/question/emptyQuestion";

export class BaseQuestion extends EmptyQuestion {
	readonly AnswerType: new (container: Locator) => BaseAnswer;
	readonly answers: Locator = this.container.locator(".answer-item");
	// readonly addNewTopicBtn?: Locator = this.container.locator(".add-topic-btn button");
	// readonly addNewGridItemActionMenu: AddNewGridItemActionMenu;

	constructor(
		readonly container: Locator,
		readonly questionType: QuestionType
	) {
		super(container);
		this.AnswerType = getAnswerType(questionType);
		// this.addNewGridItemActionMenu = new AddNewGridItemActionMenu(this.page);
	}

	getAnswerByText(text: string): BaseAnswer {
		return new this.AnswerType(
			this.answers.filter({ has: this.page.locator(`[value="${text}"]`) })
		);
	}

	getFirstAnswer(): BaseAnswer {
		return new this.AnswerType(this.answers.first());
	}

	// async addNewAnswer(answer: AddGridAnswerOptions): Promise<void> {
	// 	await expect(async () => {
	// 		await this.addNewAnswerBtn.click();
	// 		await this.addNewGridItemActionMenu.assertIsVisible();
	// 	}).toPass();
	// 	await this.addNewGridItemActionMenu.add(answer);
	// }
	//
	// async addNewTopic(topic: AddGridTopicOptions): Promise<void> {
	// 	await expect(async () => {
	// 		await this.addNewTopicBtn.click();
	// 		await this.addNewGridItemActionMenu.assertIsVisible();
	// 	}).toPass();
	// 	await this.addNewGridItemActionMenu.add(topic);
	// }
}