import { QuestionResponse } from "@typedefs/api/question.typedefs";
import { UUID } from "node:crypto";

export type CreateChapterOptions = {
	name: string;
	description?: string;
	index: number;
	surveyId: string;
	parentChapterId: string;
}

export type ChapterResponse = {
	id: UUID;
	name: string;
	order: number;
	surveyId: string;
	createdAt: string;
	updatedAt: string;
	commentsCount: number;
	unreadCommentsCount: number;
	questions: QuestionResponse[];
	childChapters: ChapterResponse[];
};

export type GetChaptersOptions = {
	surveyId: UUID;
	includeQuestions?: boolean;
	includeAnswers?: boolean
	includeTopics?: boolean;
	includeCustomFields?: boolean;
	includeFullHierarchy?: boolean;
	tenantId?: UUID;
	userId?: UUID
}

export type GetChaptersResponse = {
	items: ChapterResponse[]
}

export type ChapterDetailsOptions = {
	chapterId: UUID;
}
