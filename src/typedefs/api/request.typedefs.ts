import { APIResponse } from "@playwright/test";

export class NetworkError extends Error {
	readonly status: number;

	constructor(message: string, readonly response: APIResponse) {
		super(message);
		this.status = response.status();
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}

}

export class HttpError extends NetworkError {
	constructor(response: APIResponse) {
		super(`HTTP Error: ${response.status()} ${response.statusText()}`, response);
	}
}

export class InvalidStatusCodeError extends NetworkError {
	constructor(response: APIResponse, status: number) {
		super(`Failed to make request with status ${status}. Status: ${response.status()}`, response);
	}
}