import type { TCreateUserBodyResponse } from "@seatsavvy/types";
import { eq, or } from "drizzle-orm";

import { db } from "@/db";
import { userSchema } from "@/db/schema";

const findByUsernameOrEmail = async (data: TCreateUserBodyResponse) => {
  const { email, username } = data;

  const userExists = await db
    .select()
    .from(userSchema)
    .where(
      or(
        eq(userSchema.email, email.toLowerCase()),
        eq(userSchema.username, username.toLowerCase()),
      ),
    );

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
