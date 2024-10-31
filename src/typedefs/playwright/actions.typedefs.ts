import { MouseButton, KeyboardModifier, ScreenPoint } from "@typedefs/playwright/service.typedefs";

export type WaitForOptions = {
	state?: "visible" | "attached" | "detached" | "hidden",
	timeout?: number
}

export type ClickOptions = {
	button?: MouseButton;
	clickCount?: number;
	delay?: number;
	force?: boolean;
	modifiers?: Array<KeyboardModifier>;
	noWaitAfter?: boolean;
	position?: ScreenPoint;
	timeout?: number;
	trial?: boolean;
}