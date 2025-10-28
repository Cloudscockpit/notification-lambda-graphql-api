import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { envConfig } from "../../config";

export const client = new DynamoDBClient({
  region: envConfig.aws.region,
  credentials: {
    accessKeyId: envConfig.aws.accessKeyId,
    secretAccessKey: envConfig.aws.secretAccessKey,
  },
});

export const docClient = DynamoDBDocumentClient.from(client);
export const TableName = envConfig.notifications;
