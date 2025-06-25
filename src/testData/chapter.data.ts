import { getRandomName } from "@helpers/random.helpers";
import { CreateChapterOptions } from "@typedefs/api/chapter.typedefs";
import { UUID } from "node:crypto";

export function getChapterData(surveyId: UUID, parentChapterId: UUID, data: Omit<Partial<CreateChapterOptions>, "surveyId" | "parentChapterId"> = {}): CreateChapterOptions {
	return {
		surveyId,
		parentChapterId,
		index: 0,
		name: getRandomName("Auto-chapter"),
		description: "Automation",
		...data,
	};
}