import { guid } from "../idRegExp";

export const loginUrl = "/api/auth/login";

export const surveysUrl = {
	surveys: "/api/surveys",
	survey: `/api/surveys/${guid}`,
};

export const foldersUrl = {
	folders: "/api/folders",
	folder: `/api/folders/${guid}`,
};