import { UUID } from "node:crypto";

export type CreateQuestionAnswerOptions = {
	text: string;
}

export type QuestionAnswer = {
	id: UUID;
	variableName: string;
	text: string;
	order: number;
	questionId: UUID;
	attachments: any[];
}