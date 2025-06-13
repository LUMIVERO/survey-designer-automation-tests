import { APIRequestContext } from "@playwright/test";

export abstract class Endpoint {
	abstract url: string;

	constructor(readonly request: APIRequestContext) {
	}

	protected detailsUrl(id: string): string {
		return `${this.url}/${id}`;
	}
}