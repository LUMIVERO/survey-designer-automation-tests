import { Locator } from "@playwright/test";
import { UUID } from "node:crypto";

export interface Area {
	id: UUID;
	name: string;
}

export type PathPart = `/${string}`;

export type Locators<T> = {
	[K in keyof T]: T[K] extends Locator ? K : never
}[keyof T]

export interface Constructor<T> {
	new(...args: Array<any>): T;
}
