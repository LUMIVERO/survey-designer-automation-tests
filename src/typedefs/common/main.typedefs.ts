import { UUID } from "node:crypto";

export interface Area {
	id: UUID;
	name: string;
}

export type PathPart = `/${string}`;