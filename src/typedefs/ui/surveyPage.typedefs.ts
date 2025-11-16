import { Url as BaseUrl } from "./basePage.typedefs";
import {
	AutoCompleteListQuestion,
	BaseQuestion,
	NumericQuestion,
	SingleChoiceQuestion
} from "@ui/components/questions/designQuestions/question";
import { EmptyQuestion } from "@ui/components/questions/designQuestions/question/emptyQuestion";

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

export interface QuestionComponent {
	[QuestionType.RadioButton]: SingleChoiceQuestion;
	[QuestionType.HighlightBorders]: BaseQuestion;
	[QuestionType.AutocompleteList]: AutoCompleteListQuestion;
	[QuestionType.MultiChoiceGrid]: BaseQuestion;
	[QuestionType.SingleChoiceGrid]: SingleChoiceQuestion;
	[QuestionType.Carousel]: BaseQuestion;
	[QuestionType.Empty]: EmptyQuestion;
	[QuestionType.List]: BaseQuestion;
	[QuestionType.Slider]: BaseQuestion;
	[QuestionType.OpenEnded]: BaseQuestion;
	[QuestionType.Numeric]: NumericQuestion;
	[QuestionType.StarBar]: BaseQuestion;
}
