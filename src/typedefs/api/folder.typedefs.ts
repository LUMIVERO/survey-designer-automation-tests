import { SurveyResponse } from "./survey.typedefs";

export type GetFolderResponse = {
	items: Array<Folder>;
}

export type Folder = {
	id: string;
	name: string;
	order: number;
	tenantId: string;
	createdAt: string;
	updatedAt?: string;
	childFolders: Array<Folder>;
	surveys: Array<SurveyResponse>;
	commentsCount: number;
	unreadCommentsCount?: number;
}

export type DeleteFolderOptions = {
	folderId: string;
}
