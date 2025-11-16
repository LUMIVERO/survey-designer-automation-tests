import { Locator } from "@playwright/test";

export function isLocator(obj: any): obj is Locator {
	return typeof obj === "object" && "locator" in obj && "nth" in obj;
}