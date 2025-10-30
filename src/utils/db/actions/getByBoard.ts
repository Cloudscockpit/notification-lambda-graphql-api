import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { Notification } from "../../../types/notification";

export async function getByBoard(
  boardId: string,
  limit = 10
): Promise<Notification[]> {
  try {
    const result = await docClient.send(
      new QueryCommand({
        TableName,
        IndexName: "BoardIndex",
        KeyConditionExpression: "boardId = :b",
        ExpressionAttributeValues: { ":b": boardId },
        Limit: limit,
      })
    );
    console.log("✅ Successfully fetched by board from DynamoDB");
    return result.Items as Notification[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ DynamoDB query error:", errorMessage);
    throw new Error("Failed to fetch by board from database: " + errorMessage);
  }
}