import { UUID } from "node:crypto";

export type CustomFieldType = "Text" | "Decimal" | "Integer" | "Boolean" | "Dropdown";

export type CreateCustomFieldOptions = {
	name: string;
	tenantId: UUID;
	type: CustomFieldType;
}

export type SetCustomFieldOptions = {
	definitionId: UUID;
	name: string;
	value: string;
}

export type CustomField = {
	id: UUID;
	name: string;
	type: CustomFieldType;
}

export type GetCustomFieldsResponse = {
	currentPage: number;
	pageSize: number;
	items: CustomField[];
}
