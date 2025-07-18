import { QuestionAnswer, CreateQuestionAnswerOptions } from "@typedefs/api/answer.typedefs";
import { SetCustomFieldOptions } from "@typedefs/api/customField.typedefs";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import { UUID } from "node:crypto";

export type RenderType = "RadioList" | "CheckboxList" | "TextField" | "OtherRenderType";

export type QuestionGroup =
	| "SingleChoice"
	| "MultiChoice"
	| "Text"
	| "Matrix"
	| "Scale"
	| "Rating"
	| "General"


export type QuestionCustomFields = {
	Id: UUID;
	DefinitionId: UUID;
	name: string;
	Value: string;
}

export type CreateQuestionOptions = {
	tenantId?: UUID;
	variableName?: string;
	text: string;
	questionType: QuestionGroup;
	renderType: RenderType;
	index: number;
	chapterId: UUID;
	additionalProperties?: any;
	customFields: SetCustomFieldOptions[];
	answers: CreateQuestionAnswerOptions[];
	topics: CreateQuestionAnswerOptions[];
};

export type QuestionDetailsOptions = {
	questionId: UUID;
}

export type QuestionResponse = {
	id: UUID;
	variableName: string;
	text: string;
	questionType: keyof QuestionType;
	renderType: RenderType
	order: number;
	chapterId: UUID;
	createdAt: string;
	attachments: any[];
	answers: QuestionAnswer[];
	topics: QuestionAnswer[];
	commentsCount: number;
	unreadCommentsCount: number;
}