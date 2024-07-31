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