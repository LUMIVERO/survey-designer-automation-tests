import { LoggedInBasePage } from "../loggedIn.base.page";
import { surveyUrl } from "../../../data/urls/uiUrls";

export class SurveysPage extends LoggedInBasePage {
	url = surveyUrl.surveysTab;
}