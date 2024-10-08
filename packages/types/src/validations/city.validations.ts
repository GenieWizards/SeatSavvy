import z from "zod";

import { ECitySortFields } from "../enums/city.enums";
import { CommonQuerySchema, type ICommon } from "./common.validations";

export const CreateCityBodySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: "City name is required",
    })
    .trim()
    .min(3, "City name should be atleast 3 characters")
    .max(80, "City name cannot be longer than 80 characters")
    .toLowerCase(),
  // .regex(
  //   /^[a-z0-9_-]+$/,
  //   "only lowercase alphabets, numbers, _, and - are allowed",
  // ),
  state: z
    .string({
      required_error: "State name is required",
    })
    .trim()
    .min(3, "State name should be atleast 3 characters")
    .max(80, "State name cannot be longer than 80 characters")
    .toLowerCase(),
});

export const CityQuerySchema = CommonQuerySchema.omit({
  price: true,
  category: true,
  fromDate: true,
  toDate: true,
  location: true,
}).extend({
  sort: z.nativeEnum(ECitySortFields).optional(),
});

export type TCreateCityBodyResponse = z.infer<typeof CreateCityBodySchema> &
  ICommon;
export type TCityQuery = z.infer<typeof CityQuerySchema>;
