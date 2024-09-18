import * as z from "zod";

export enum ClimbingType {
    OUTDOOR_BOULDER = "Outdoor boulder",
    OUTDOOR_ROUTE = "Outdoor route",
    INDOOR_ROUTE = "Indoor route",
    INDOOR_BOULDER = "Indoor boulder",
    MULTI_PITCH = "Multi pitch",
}

export const ProfileSchemaInput = z.object({
    description: z.string({
        message: "The length of description must be between 10 and 250 characters.",
        required_error: "The description is required."
    }).min(10).max(250),
    maxRating: z.string().regex(/^[1-9][a-c]\+?$/, {message: 'Example 6a+'}),
    profilePublic: z.boolean(),
    preferredClimbingType: z.nativeEnum(ClimbingType),
    birthDate: z.date({message: "Birth date is invalid."})
});
export type ProfileInput = z.infer<typeof ProfileSchemaInput>;

export const ProfileSchemaResponse = z.object({});