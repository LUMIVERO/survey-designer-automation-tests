import { Folder } from "@api/folder";
import { Question } from "@api/question";
import { Survey } from "@api/survey";
import { APIRequestContext } from "@playwright/test";

export class ApiApplication {
	readonly folder: Folder = new Folder(this.request);
	readonly survey: Survey = new Survey(this.request);
	readonly question: Question = new Question(this.request);

	constructor(readonly request: APIRequestContext) {
	}
}
