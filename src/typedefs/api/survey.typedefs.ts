import { UUID } from "node:crypto";

export type CreateSurveyOptions = {
	name: string;
	folderId: string;
}

export type SurveyResponse = {
	id: UUID;
	name: string;
	folderId: UUID;
	status: string;
	isFavorite: string;
	createdAt: string;
	chapters: Array<Record<string, any>>;
	commentsCount: number;
}

export type DeleteSurveyOptions = {
	surveyId: UUID;
}