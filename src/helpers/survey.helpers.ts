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
	EmptyAnswer
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
		}
	));
}
