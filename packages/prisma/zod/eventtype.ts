import * as z from "zod"
import * as imports from "../zod-utils"
import { PeriodType, SchedulingType } from "@prisma/client"
import { CompleteUser, UserModel, CompleteTeam, TeamModel, CompleteHashedLink, HashedLinkModel, CompleteBooking, BookingModel, CompleteAvailability, AvailabilityModel, CompleteWebhook, WebhookModel, CompleteDestinationCalendar, DestinationCalendarModel, CompleteEventTypeCustomInput, EventTypeCustomInputModel, CompleteSchedule, ScheduleModel, CompleteWorkflowsOnEventTypes, WorkflowsOnEventTypesModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const _EventTypeModel = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  slug: imports.eventTypeSlug,
  description: z.string().nullish(),
  position: z.number().int(),
  locations: imports.eventTypeLocations,
  length: z.number().int(),
  hidden: z.boolean(),
  userId: z.number().int().nullish(),
  teamId: z.number().int().nullish(),
  eventName: z.string().nullish(),
  timeZone: z.string().nullish(),
  periodType: z.nativeEnum(PeriodType),
  periodStartDate: z.date().nullish(),
  periodEndDate: z.date().nullish(),
  periodDays: z.number().int().nullish(),
  periodCountCalendarDays: z.boolean().nullish(),
  requiresConfirmation: z.boolean(),
  recurringEvent: imports.recurringEventType,
  disableGuests: z.boolean(),
  hideCalendarNotes: z.boolean(),
  minimumBookingNotice: z.number().int(),
  beforeEventBuffer: z.number().int(),
  afterEventBuffer: z.number().int(),
  seatsPerTimeSlot: z.number().int().nullish(),
  seatsShowAttendees: z.boolean().nullish(),
  schedulingType: z.nativeEnum(SchedulingType).nullish(),
  scheduleId: z.number().int().nullish(),
  price: z.number().int(),
  currency: z.string(),
  slotInterval: z.number().int().nullish(),
  metadata: imports.EventTypeMetaDataSchema,
  successRedirectUrl: imports.successRedirectUrl.nullish(),
  bookingLimits: imports.bookingLimitsType,
})

export interface CompleteEventType extends z.infer<typeof _EventTypeModel> {
  users: CompleteUser[]
  owner?: CompleteUser | null
  team?: CompleteTeam | null
  hashedLink?: CompleteHashedLink | null
  bookings: CompleteBooking[]
  availability: CompleteAvailability[]
  webhooks: CompleteWebhook[]
  destinationCalendar?: CompleteDestinationCalendar | null
  customInputs: CompleteEventTypeCustomInput[]
  schedule?: CompleteSchedule | null
  workflows: CompleteWorkflowsOnEventTypes[]
}

/**
 * EventTypeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const EventTypeModel: z.ZodSchema<CompleteEventType> = z.lazy(() => _EventTypeModel.extend({
  users: UserModel.array(),
  owner: UserModel.nullish(),
  team: TeamModel.nullish(),
  hashedLink: HashedLinkModel.nullish(),
  bookings: BookingModel.array(),
  availability: AvailabilityModel.array(),
  webhooks: WebhookModel.array(),
  destinationCalendar: DestinationCalendarModel.nullish(),
  customInputs: EventTypeCustomInputModel.array(),
  schedule: ScheduleModel.nullish(),
  workflows: WorkflowsOnEventTypesModel.array(),
}))
