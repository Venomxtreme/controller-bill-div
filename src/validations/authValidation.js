import { z } from "zod";

export const loginSchema = z.object({
  cpf: z
    .string()
    .min(11, "CPF inválido"),

  password: z
    .string()
    .min(6, "Mínimo 6 caracteres"),
});

export const registerSchema =
  z.object({

    email:
      z.string()
        .email("Email inválido"),

    cpf:
      z.string()
        .min(11, "CPF inválido"),

    password:
      z.string()
        .min(6,
          "Mínimo 6 caracteres"
        ),

    confirmPassword:
      z.string(),

  })

  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,

    {
      message:
        "As senhas não coincidem",

      path: ["confirmPassword"],
    }
  );