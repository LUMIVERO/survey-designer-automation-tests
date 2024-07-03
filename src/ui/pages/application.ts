import { LoginPage } from "./login/login.page";
import { Page } from "@playwright/test";
import { SurveysDashboardPage } from "./surveys/surveysDashboard.page";
import { SurveyDetailsPage } from "./surveys/surveyDetails.page";

export class Application {
	readonly loginPage: LoginPage;
	readonly surveysPage: SurveysDashboardPage;
	readonly surveyDetailsPage: SurveyDetailsPage;

	constructor(readonly page: Page) {
		this.loginPage = new LoginPage(this.page);
		this.surveysPage = new SurveysDashboardPage(this.page);
		this.surveyDetailsPage = new SurveyDetailsPage(this.page);
	}
}