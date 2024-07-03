import { complexId } from "../idRegExp";

export const loginUrl = `/login`;

export const surveyUrl = {
	surveysTab: "surveys",
	surveysDetails: `/surveys/edit-survey/${complexId}`
};