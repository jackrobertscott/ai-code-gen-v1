import { z } from "zod"

const FieldSchema = z.object({
  name: z.string(),
  type: z.enum(["string", "number", "boolean", "date"]),
  required: z.boolean().optional(),
  unique: z.boolean().optional(),
  default: z.any().optional(),
})

const IndexSchema = z.object({
  fields: z.array(z.string()),
  unique: z.boolean().optional(),
})

export const ModelSchema = z.object({
  name: z.string(),
  fields: z.array(FieldSchema),
  indexes: z.array(IndexSchema).optional(),
})
