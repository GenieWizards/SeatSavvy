import type { TCreateUserBodyResponse } from "@seatsavvy/types";
import { eq, or } from "drizzle-orm";

import { db } from "@/db";
import { userSchema } from "@/db/schema";
import { lower } from "@/db/schema/user.schema";

import type { IUsernameOrEmail } from "./auth.types";

const findByUsernameOrEmail = async (data: IUsernameOrEmail) => {
  const { email, username } = data;

  const conditions = [
    eq(userSchema.username, username.toLowerCase()),
    eq(lower(userSchema.email), username.toLowerCase()),
  ];

  // Add email condition only if it's provided
  if (email) {
    conditions.push(eq(lower(userSchema.email), email.toLowerCase()));
  }

  const userExists = await db
    .select()
    .from(userSchema)
    .where(or(...conditions));

  return userExists;
};

const create = async (data: TCreateUserBodyResponse) => {
  const user = await db.insert(userSchema).values(data).returning();

  return user;
};

export default {
  create,
  findByUsernameOrEmail,
};
