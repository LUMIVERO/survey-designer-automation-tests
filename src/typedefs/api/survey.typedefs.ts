import { ChapterResponse } from "@typedefs/api/chapter.typedefs";
import { UUID } from "node:crypto";

export type CreateSurveyOptions = {
	name: string;
	folderId: UUID;
}

export type SurveyResponse = {
	id: UUID;
	name: string;
	folderId: UUID;
	status: string;
	isFavorite: string;
	createdAt: string;
	chapters: ChapterResponse[];
	commentsCount: number;
}

export type GetSurveyOptions = {
	surveyId: UUID;
	includeChapters?: boolean;
	includeFullHierarchy?: boolean;
}

export type DeleteSurveyOptions = {
	surveyId: UUID;
}