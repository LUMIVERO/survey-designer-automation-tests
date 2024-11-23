import { Timeout } from "@typedefs/playwright/service.typedefs";

export type AssertIsChecked = Timeout & {
	checked?: boolean;
}

export type AssertIsVisible = Timeout & {
	visible?: boolean;
}

export type AssertIsEnabled = Timeout & {
	enabled?: boolean;
}

export type AssertToHaveAttribute = Timeout & {
	ignoreCase?: boolean;
}

export type AssertToHaveText = Timeout & {
	ignoreCase?: boolean;
	useInnerText?: boolean;
}
