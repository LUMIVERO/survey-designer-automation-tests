import { createUrl } from "@helpers/url.helpers";
import { testArea1 } from "src/constants/env.data";
import { guid } from "../idRegExp";

export const loginUrl = `/login`;
export const areasUrl = createUrl("/areas", {
	root: "/",
});

export const surveyUrl = createUrl(`/${testArea1.name}`, {
	surveysTab: "/surveys",
	surveysDetails: `/surveys/edit-survey/${guid}`,
});

export const folderUrl = createUrl(`/${testArea1.name}`, {
	folderDetails: `/surveys/folder/${guid}`,
});