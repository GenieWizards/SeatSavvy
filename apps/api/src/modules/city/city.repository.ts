import type { TCreateCityBodyResponse } from "@seatsavvy/types";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { citySchema } from "@/db/schema";
import { lower } from "@/db/schema/user.schema";

const findByCityAndState = async (cityName: string, stateName: string) => {
  const city = await db
    .select()
    .from(citySchema)
    .where(
      and(
        eq(lower(citySchema.name), cityName.toLowerCase()),
        eq(lower(citySchema.state), stateName.toLowerCase()),
      ),
    );

  return city;
};

const create = async (data: TCreateCityBodyResponse) => {
  const city = await db.insert(citySchema).values(data).returning();

  return city;
};

export default {
  findByCityAndState,
  create,
};
