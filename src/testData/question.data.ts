import { getRandomName } from "@helpers/random.helpers";
import { CreateQuestionOptions } from "@typedefs/api/question.typedefs";
import { UUID } from "node:crypto";
import { tenantId } from "src/constants/env.data";

export function getQuestionData(chapterId: UUID, data: Omit<Partial<CreateQuestionOptions>, "chapterId"> = {}): CreateQuestionOptions {
	return {
		tenantId,
		text: getRandomName("Auto-Question"),
		questionType: "SingleChoice",
		renderType: "RadioList",
		index: 0,
		chapterId,
		customFields: [],
		answers: [{
			text: getRandomName("Auto-Answer"),
		}],
		topics: [],
		...data,
	};
}