export type CreateSurveyOptions = {
	name: string;
	folderId: string;
}

export type SurveyResponse = {
	id: string;
	name: string;
	folderId: string;
	createdAt: string;
	chapters: Array<Record<string, any>>;
	commentsCount: number;
}

export type DeleteSurveyOptions = {
	surveyId: string;
}