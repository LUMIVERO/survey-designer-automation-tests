import { LoginPage } from "./login/login.page";
import { Page } from "@playwright/test";
import { SurveysPage } from "./surveys/surveys.page";

export class Application {
	readonly loginPage: LoginPage;
	readonly surveysPage: SurveysPage;

	constructor(readonly page: Page) {
		this.loginPage = new LoginPage(this.page);
		this.surveysPage = new SurveysPage(this.page);
	}
}