import { Response } from "@playwright/test";

export type ResponseBooleanCallback = (response: Response) => Promise<boolean>

export type WaitForResponse = {
	waitForResponse: boolean;
	callback?: ResponseBooleanCallback;
}

export type ClickOpenable = {
	shouldOpen: boolean
}