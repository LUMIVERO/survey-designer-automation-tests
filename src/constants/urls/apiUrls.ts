import { createUrl } from "@helpers/url.helpers";
import { testArea1 } from "src/constants/env.data";
import { guid } from "../idRegExp";

export const loginUrl = "/api/auth/login";

export const questionsUrl = createUrl(`/api/areas/${testArea1.id}/questions`, {
	root: "/",
	details: `/${guid}`,
});

export const surveysUrl = createUrl(`/api/areas/${testArea1.id}/surveys`, {
	root: "/",
	details: `/${guid}`,
	duplicate: `/${guid}/duplicate`,
});

export const foldersUrl = createUrl(`/api/areas/${testArea1.id}/folders`, {
	root: "/",
	details: `/${guid}`,
});

export const chaptersUrl = createUrl(`/api/areas/${testArea1.id}/chapters`, {
	root: "/",
	qBank: "/import/from-groups-tree",
});