import { Page } from "@playwright/test";
import { LoginPage } from "./pages/login/login.page";
import { SurveyDetailsPage } from "./pages/surveys/surveyDetails.page";
import { SurveysDashboardPage } from "./pages/surveys/surveysDashboard.page";

export class Application {
	readonly loginPage: LoginPage = new LoginPage(this.page);
	readonly surveysPage: SurveysDashboardPage = new SurveysDashboardPage(this.page);
	readonly surveyDetailsPage: SurveyDetailsPage = new SurveyDetailsPage(this.page);

	constructor(readonly page: Page) {
	}
}