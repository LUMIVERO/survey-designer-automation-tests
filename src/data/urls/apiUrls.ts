import { complexId } from "../idRegExp";

export const loginUrl = "/api/auth/login";

export const surveysUrl = {
	surveys: "/api/surveys",
	survey: `/api/surveys/${complexId}`,
};

export const foldersUrl = {
	folders: "/api/folders",
	folder: `/api/folders/${complexId}`,
};