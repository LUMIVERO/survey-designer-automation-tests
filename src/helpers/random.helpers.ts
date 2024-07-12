import * as casual from "casual";

export function getRandomName(startWord?: string): string {
	const word = startWord ?? casual.word;
	const randomString: string = Math.random().toString(36).slice(2, 5);
	const randomNumber: string = Math.random().toString().slice(2, 8);
	return `${word}-${randomString}${randomNumber}`;
}
