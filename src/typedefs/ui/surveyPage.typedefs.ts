import { Url as BaseUrl } from "./basePage.typedefs";

export type Url = BaseUrl & {
	waitForResponse?: boolean
}

export type DuplicateSurveyOptions = {
	surveyName: string;
	newSurveyName?: string;
}
