import { Area } from "@typedefs/common/main.typedefs";
import * as process from "node:process";

export const BASE_URL = process.env.BASE_URL;
export const testArea1: Area = {
	name: "test-area-1",
	id: "7b5867cd-86cc-149f-b2ce-ddbc5a967b79"
} as const;

export const ADMIN_CREDS = {
	username: process.env.USERNAME_ADMIN,
	password: process.env.PASSWORD_ADMIN,
	tenant: process.env.TENANT1,
	email: process.env.EMAIL
} as const;