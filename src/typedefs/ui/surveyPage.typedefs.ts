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
	HighlightBorders = "Highlight Borders",
	AutocompleteList = "Autocomplete List",
	MultiChoiceGrid = "Multi Choice Grid",
	SingleChoiceGrid = "Single Choice Grid",
	Carousel = "Carousel",
	Empty = "Empty",
	List = "List",
	Slider = "Slider",
	OpenEnded = "Open-ended",
	Numeric = "Numeric",
	StarBar = "Star bar",
}
