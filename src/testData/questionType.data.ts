import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

export const questionTypeInputAssertions: Record<QuestionType, Record<string, any>> = {
	[QuestionType.RadioButton]: {
		answerText: "Answer #1",
		code: 1,
		varText: "A_1_Q_1"
	}
}