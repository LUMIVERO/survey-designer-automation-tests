import { PathPart } from "@typedefs/common/main.typedefs";
import { guid } from "src/constants/idRegExp";

export function setIdOnUrl(
	url: string,
	id: number | string,
	pattern: string = guid,
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

export function getIdFromString(str: string, pattern: string = guid): string {
	const matches = new RegExp(pattern).exec(str);

	if (matches) {
		return matches[0];
	}

	throw new Error(`URL '${str}' does not contain a match for the provided ID pattern '${pattern}'.`);
}

export function createUrl<T extends Record<string, PathPart>>(service: PathPart, endpoints: T): T {
	return Object.entries(endpoints).reduce((result, [key, value]) => {

		result[key] = value === "/" ? service : service + value;

		return result;
	}, {}) as T;
}

export function toQueryParams(params: Record<string, number | string | boolean>): string {
	return new URLSearchParams(
		Object.entries(params).reduce((acc, [key, value]) => {
			acc[key] = String(value);
			return acc;
		}, {} as Record<string, string>),
	).toString();
}

export function setQuery(url: string, params:  Record<string, number | string | boolean>): string {
	const query = toQueryParams(params);

	return query ? url + query : url

}