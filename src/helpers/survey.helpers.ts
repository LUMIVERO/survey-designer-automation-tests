import { ApiApplication } from "@api/apiApplication";
import { Locator } from "@playwright/test";
import { QuestionType } from "@typedefs/ui/surveyPage.typedefs";
import {
	RadioAnswer,
	SliderAnswer,
	BaseAnswer,
	OpenEndedAnswer,
	ListAnswer,
	GridAnswer,
	EmptyAnswer,
	HighlightBordersAnswer,
	AutoCompleteList,
	StarBarAnswer,
} from "@ui/components/questions/designQuestions/answers";

export function getAnswerType(questionType: QuestionType): new (container: Locator) => BaseAnswer {
	switch (questionType) {
		case QuestionType.RadioButton:
			return RadioAnswer;
		case QuestionType.Slider:
			return SliderAnswer;
		case QuestionType.OpenEnded:
			return OpenEndedAnswer;
		case QuestionType.List:
			return ListAnswer;
		case QuestionType.Grid:
			return GridAnswer;
		case QuestionType.Empty:
			return EmptyAnswer;
		case QuestionType.HighlightBorders:
			return HighlightBordersAnswer;
		case QuestionType.AutocompleteList:
			return AutoCompleteList;
		case QuestionType.StarBar:
			return StarBarAnswer;
		default:
			throw new Error(`Unknown question type: ${questionType}`);
	}
}

export async function deleteSurveysByName(apiService: ApiApplication, pattern: string = "SurveyAUT-") {
	const { items: [{ surveys }] } = await apiService.folder.getFolders();

	await Promise.all(surveys.map(async survey => {
			if (survey.name.startsWith(pattern)) {
				return await apiService.survey.deleteSurvey({ surveyId: survey.id });
			}
		},
	));
}

export async function deleteFoldersByName(apiService: ApiApplication, pattern: string = "FolderAUT-") {
	const { items: [{ childFolders: folders }] } = await apiService.folder.getFolders();

	await Promise.all(folders.map(async folder => {
			if (folder.name.startsWith(pattern)) {
				return await apiService.folder.deleteFolder({ folderId: folder.id });
			}
		},
	));
}
