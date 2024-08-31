import z from "zod";

export const demoSchema = z.object({
  name: z.string().min(2),
});

export type TDemoSchema = z.infer<typeof demoSchema>;
