import { UUID } from "node:crypto";

export const uuidRegex =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUUID(value: unknown): value is UUID {
	if (typeof value !== "string") return false;

	return uuidRegex.test(value);
}