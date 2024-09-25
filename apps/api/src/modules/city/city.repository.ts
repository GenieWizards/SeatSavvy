import type { TCityQuery, TCreateCityBodyResponse } from "@seatsavvy/types";
import { and, eq, ilike, or } from "drizzle-orm";

import filterUtil from "@/common/utils/filter.util";
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

const findAll = async (queryData: TCityQuery) => {
  const { limit, page, search } = filterUtil.set(queryData);

  const dbQuery = db.select().from(citySchema);

  // Create a conditional where clause
  const whereClause = [];

  if (search) {
    whereClause.push(
      or(
        ilike(citySchema.name, `%${search}%`),
        ilike(citySchema.state, `%${search}%`),
      ),
    );
  }

  const finalQuery =
    whereClause.length > 0 ? dbQuery.where(and(...whereClause)) : dbQuery;

  const cities = await finalQuery.limit(limit).offset((page - 1) * limit);

  return cities;
};
const create = async (data: TCreateCityBodyResponse) => {
  const city = await db.insert(citySchema).values(data).returning();

  return city;
};

export default {
  findByCityAndState,
  findAll,
  create,
};
