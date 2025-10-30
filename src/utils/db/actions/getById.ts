import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { Notification } from "../../../types/notification";

export async function getById(id: string): Promise<Notification | undefined> {
  try {
    const result = await docClient.send(
      new GetCommand({ TableName, Key: { id } })
    );
    console.log("✅ Successfully fetched by ID from DynamoDB");
    return result.Item as Notification;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ DynamoDB get error:", errorMessage);
    throw new Error("Failed to fetch by ID from database: " + errorMessage);
  }
}