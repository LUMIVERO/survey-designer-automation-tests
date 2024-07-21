import { APIResponse, BrowserContext } from "@playwright/test";
import { HttpError, InvalidStatusCodeError } from "@typedefs/api/request.typedefs";
import { readFile } from "fs/promises";

export async function raiseForStatus(response: APIResponse, statusCode?: number) {
	if (!response.ok()) {
		throw new HttpError(response);
	}

	if (statusCode && response.status() !== statusCode) {
		throw new InvalidStatusCodeError(response, statusCode);
	}
}

export async function getToken(context: BrowserContext): Promise<string> {
	const storageState = await context.storageState();
	return parseToken(storageState);
}

export async function getTokenFromFile(filePath: string): Promise<string> {
	const authData = JSON.parse(await readFile(filePath, "utf-8"));
	return parseToken(authData);
}

export function parseToken(data: Record<string, any>): string {
	try {
		const { origins: [{ localStorage: [{ value: auth }] }] } = data;
		return `Bearer ${auth.slice(1, -1)}`;
	} catch (error) {
		console.error("Failed to get token:", error);
		throw new Error("Unable to retrieve token");
	}
}
