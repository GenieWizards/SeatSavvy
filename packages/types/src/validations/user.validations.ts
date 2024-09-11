import z from "zod";

export const CreateUserBodySchema = z.object({
  id: z.string().optional(),
  username: z
    .string({
      required_error: "username is required",
    })
    .trim()
    .min(5, "username should be atleast 5 characters")
    .max(20, "username cannot be longer than 20 characters")
    .toLowerCase()
    .regex(
      /^[a-z0-9_-]+$/,
      "only lowercase alphabets, numbers, _, and - are allowed",
    ),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  fullName: z
    .string({
      required_error: "fullName is required",
    })
    .trim()
    .min(3, "fullName should be atleast 3 characters")
    .max(30, "fullName cannot be longer than 30 characters")
    .optional(),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(8, "Password should be atleast 8 characters")
    .max(50, "Password cannot be longer than 50 characters"),
});

export const LoginUserBodySchema = CreateUserBodySchema.omit({
  fullName: true,
}).extend({
  username: z
    .string({
      required_error: "username/email is required",
    })
    .trim()
    .min(5, "username should be atleast 5 characters")
    .toLowerCase(),
  email: z.string().email("Invalid email address").optional(),
});

export type TCreateUserBodyResponse = z.infer<typeof CreateUserBodySchema>;
export type TLoginUserBodyResponse = z.infer<typeof LoginUserBodySchema>;
