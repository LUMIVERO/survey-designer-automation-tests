import { complexId } from "../data/idRegExp";

export function setIdOnUrl(
	url: string,
	id: number | string,
	pattern: string = complexId
): string {
	const idString = `${id}`;

	const regExp = new RegExp(pattern);

	if (url.includes(pattern)) {
		return url.replace(pattern, idString);
	}

	if (regExp.test(url)) {
		return url.replace(regExp, idString);
	}

	throw new Error(`URL '${url}' does not contain a match for the provided ID pattern '${pattern}'.`);
}

export function getIdFromString(str: string, pattern: string = complexId): string {
	const matches = new RegExp(pattern).exec(str);

	if (matches) {
		return matches[0];
	}

	throw new Error(`URL '${str}' does not contain a match for the provided ID pattern '${pattern}'.`);
}