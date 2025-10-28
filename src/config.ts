import dotenv from "dotenv";
import z from "zod";

dotenv.config(); 

export const envConfigSchema = z.object({
  aws: z.object({
    accessKeyId: z.string(),
    secretAccessKey: z.string(),
    region: z.string().default("us-east-1"),
  }),
  notifications: z.string(),
});

export const envConfig = envConfigSchema.parse({
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  },
  notifications: process.env.NOTIFICATION_TABLE,
});
