import { MouseButton, KeyboardModifier, ScreenPoint, Timeout } from "@typedefs/playwright/service.typedefs";

export type WaitForOptions = Timeout & {
	state?: "visible" | "attached" | "detached" | "hidden",
}

export type ClickOptions = Timeout & {
	button?: MouseButton;
	clickCount?: number;
	delay?: number;
	force?: boolean;
	modifiers?: Array<KeyboardModifier>;
	noWaitAfter?: boolean;
	position?: ScreenPoint;
	trial?: boolean;
}