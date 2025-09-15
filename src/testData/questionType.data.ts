import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

export const questionTypeInputAssertions: Partial<Record<QuestionType, Record<string, any>>> = {
	[QuestionType.RadioButton]: {
		answerText: "Answer #1",
		code: 1,
		varText: "A_1_Q_1",
	},
	get [QuestionType.HighlightBorders]() {
		return this[QuestionType.RadioButton]
	},
	[QuestionType.MultiChoiceGrid]: {
		type: "checkbox",
	},
	[QuestionType.SingleChoiceGrid]: {
		type: "radio",
	},
	[QuestionType.Carousel]: {
		answerText: "Answer #1",
		code: 1,
		varText: "A_1_Q_1",
	},
};