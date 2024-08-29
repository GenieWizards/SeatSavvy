import z from "zod";

export const testSchema = z.object({
  name: z.string().min(2),
});

export type TTestSchema = z.infer<typeof testSchema>;
