import { createUrl } from "@helpers/url.helpers";
import { testArea1 } from "src/constants/env.data";
import { guid } from "../idRegExp";

export const loginUrl = "/api/auth/login";

export const questionsUrl = createUrl(`/api/areas/${testArea1.id}/questions`, {
	questions: "/",
	question: `/${guid}`,
});

export const surveysUrl = createUrl(`/api/areas/${testArea1.id}/surveys`, {
	surveys: "/",
	survey: `/${guid}`,
	duplicate: `/${guid}/duplicate`,
});

export const foldersUrl = createUrl(`/api/areas/${testArea1.id}/folders`, {
	folders: "/",
	folder: `/${guid}`,
});