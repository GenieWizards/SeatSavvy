import z from "zod";

export interface ICommon {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  success?: boolean;
}

export const CommonQuerySchema = z.object({
  page: z.coerce.number().int().positive().min(1).optional().default(1),
  limit: z.coerce
    .number()
    .int()
    .positive()
    .min(1)
    .max(100)
    .optional()
    .default(20),
  search: z
    .string()
    .trim()
    .min(3, {
      message: "Search term must contain at least 3 characters",
    })
    .optional(),
  order: z.enum(["asc", "desc"]).optional().default("asc"),
  sort: z.string().optional(),
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
  category: z.string().optional(),
  location: z.string().optional(),
  price: z
    .object({
      min: z.coerce.number().nonnegative().optional(),
      max: z.coerce.number().positive().optional(),
    })
    .optional(),
});
// This creates a problem where I cannot use .omit(). Need to find a solution🥲
// .refine(
//   ({ fromDate, toDate }) => {
//     if (fromDate && toDate) {
//       return fromDate <= toDate;
//     }
//     return true;
//   },
//   {
//     message: "fromDate cannot be greater than toDate",
//     path: ["fromDate", "toDate"],
//   },
// );

export type TCommonQueryParams = z.infer<typeof CommonQuerySchema>;
