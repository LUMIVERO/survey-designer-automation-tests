import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";

export type GetQuestionOptions = {
	questionId: string;
}

export type RenderType = "RadioList" | "CheckboxList" | "TextField" | "OtherRenderType"

export type Answer = {
	id: string;
	variableName: string;
	text: string;
	order: number;
	questionId: string;
	attachments: any[];
}

export type QuestionResponse = {
	id: string;
	variableName: string;
	text: string;
	questionType: QuestionType;
	renderType: RenderType
	order: number;
	chapterId: string;
	createdAt: string;
	attachments: any[];
	answers: Answer[];
	topics: any[];
	commentsCount: number;
	unreadCommentsCount: number;
}