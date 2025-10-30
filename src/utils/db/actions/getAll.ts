import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { Notification } from "../../../types/notification";

export async function getAll(limit = 10, offset = 0): Promise<Notification[]> {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName, Limit: limit })
    );
    console.log("✅ Successfully fetched from DynamoDB");
    return result.Items as Notification[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("DynamoDB scan error:", errorMessage);
    throw new Error("Failed to fetch from database: " + errorMessage);
  }
}