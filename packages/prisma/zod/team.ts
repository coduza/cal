import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteMembership, MembershipModel, CompleteEventType, EventTypeModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _TeamModel = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  slug: z.string().min(1).nullish(),
  logo: z.string().nullish(),
  bio: z.string().nullish(),
  hideBranding: z.boolean(),
  createdAt: z.date(),
  metadata: imports.teamMetadataSchema,
})

export interface CompleteTeam extends z.infer<typeof _TeamModel> {
  members: CompleteMembership[]
  eventTypes: CompleteEventType[]
}

/**
 * TeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const TeamModel: z.ZodSchema<CompleteTeam> = z.lazy(() => _TeamModel.extend({
  members: MembershipModel.array(),
  eventTypes: EventTypeModel.array(),
}))
