import { SurveyResponse } from "./survey.typedefs";

export type GetFolderResponse = {
	items: Array<FolderResponse>;
}

export type FolderResponse = {
	id: string;
	name: string;
	order: number;
	tenantId: string;
	parentFolderId?: string;
	createdAt: string;
	updatedAt?: string;
	childFolders: Array<FolderResponse>;
	surveys: Array<SurveyResponse>;
	commentsCount: number;
	unreadCommentsCount?: number;
}

export type DeleteFolderOptions = {
	folderId: string;
}

export type CreateFolderOptions = {
	name: string;
	parentFolderId: string;
}
