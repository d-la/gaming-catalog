import * as z from "zod";

const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address");

const passwordSchema = z.string().min(1, "Password is required");

export const validateEmail = (value: string) => {
    const parsed = emailSchema.safeParse(value);
    return parsed.success
        ? ""
        : (parsed.error.issues[0]?.message ?? "Invalid email");
};

export const validatePassword = (value: string) => {
    const parsed = passwordSchema.safeParse(value);
    return parsed.success
        ? ""
        : (parsed.error.issues[0]?.message ?? "Invalid password");
};
