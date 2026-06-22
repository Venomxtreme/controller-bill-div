import { z } from "zod";

export const receitaSchema =
  z.object({
    titulo: z
      .string()
      .min(2, "Título obrigatório"),

    valor: z
      .number()
      .min(1, "Valor inválido"),

    categoria: z
      .string()
      .min(
        2,
        "Categoria obrigatória"
      ),
  });