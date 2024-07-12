import { Folder } from "@api/folder";
import { Survey } from "@api/survey";
import { APIRequestContext } from "@playwright/test";

export class ApiApplication {
	readonly folder: Folder = new Folder(this.request);
	readonly survey: Survey = new Survey(this.request);

	constructor(readonly request: APIRequestContext) {
	}
}
