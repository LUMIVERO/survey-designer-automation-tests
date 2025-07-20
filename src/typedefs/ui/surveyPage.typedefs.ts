import { Url as BaseUrl } from "./basePage.typedefs";

export type RowType = "survey" | "folder" | "wave";

export type Url = BaseUrl & {
	waitForResponse?: boolean
}

export type DuplicateSurveyOptions = {
	surveyName: string;
	newSurveyName?: string;
}

export enum QuestionType {
	RadioButton = "Radio Button",
	Slider = "Slider",
	OpenEnded = "Open-ended",
	List = "List",
	Grid = "Grid",
	Empty = "Empty",
	HighlightBorders = "Highlight Borders",
	AutocompleteList = "Autocomplete List",
	StarBar = "Star bar",
}
