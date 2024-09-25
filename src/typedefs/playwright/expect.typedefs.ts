export type AssertIsChecked = {
	checked?: boolean;
	timeout?: number;
}

export type AssertIsVisible = {
	visible?: boolean;
	timeout?: number;
}

export type AssertIsEnabled = {
	enabled?: boolean;
	timeout?: number;
}

export type AssertToHaveAttribute = {
	ignoreCase?: boolean;
	timeout?: number;
}

export type AssertToHaveText = {
	ignoreCase?: boolean;
	timeout?: number;
	useInnerText?: boolean;
}