import { guid } from "../idRegExp";

export const loginUrl = `/login`;

export const surveyUrl = {
	surveysTab: "surveys",
	surveysDetails: `/surveys/edit-survey/${guid}`
};

export const folderUrl = {
	folderDetails: `/surveys/folder/${guid}`
};