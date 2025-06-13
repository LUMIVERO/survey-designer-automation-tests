import { Folder, Question, Survey, Chapter } from "@api/managers";
import { APIRequestContext } from "@playwright/test";

export class ApiApplication {
	readonly folder: Folder = new Folder(this.request);
	readonly survey: Survey = new Survey(this.request);
	readonly question: Question = new Question(this.request);
	readonly chapter: Chapter = new Chapter(this.request);

	constructor(private request: APIRequestContext) {
	}
}
