import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { Notification } from "../../../types/notification";

export async function create(
  notification: Notification
): Promise<Notification> {
  try {
    await docClient.send(new PutCommand({ TableName, Item: notification }));
    console.log("✅ Successfully saved to DynamoDB");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(" DynamoDB error:", errorMessage);
    throw new Error("Failed to save to database: " + errorMessage);
  }
  return notification;
}
