// import dotenv from "dotenv";
// import z from "zod";

// dotenv.config(); 

// export const envConfigSchema = z.object({
//   aws: z.object({
//     accessKeyId: z.string(),
//     secretAccessKey: z.string(),
//     region: z.string().default("us-east-1"),
//   }),
//   notifications: z.string(),
// });

// export const envConfig = envConfigSchema.parse({
//   aws: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_REGION,
//   },
//   notifications: process.env.NOTIFICATION_TABLE,
// });

// Simple environment configuration without zod
export const envConfig = {
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        region: process.env.AWS_REGION || 'us-east-1',
    },
    notifications: process.env.NOTIFICATION_TABLE || '',
};

// Basic validation
if (!envConfig.aws.accessKeyId) {
    throw new Error('AWS_ACCESS_KEY_ID environment variable is required');
}
if (!envConfig.aws.secretAccessKey) {
    throw new Error('AWS_SECRET_ACCESS_KEY environment variable is required');
}
if (!envConfig.notifications) {
    throw new Error('NOTIFICATION_TABLE environment variable is required');
}