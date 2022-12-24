import * as z from "zod"
import * as imports from "../zod-utils"
import { CompleteUser, UserModel } from "./index"

export const _VerifiedNumberModel = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  phoneNumber: z.string(),
})

export interface CompleteVerifiedNumber extends z.infer<typeof _VerifiedNumberModel> {
  user: CompleteUser
}

/**
 * VerifiedNumberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const VerifiedNumberModel: z.ZodSchema<CompleteVerifiedNumber> = z.lazy(() => _VerifiedNumberModel.extend({
  user: UserModel,
}))
