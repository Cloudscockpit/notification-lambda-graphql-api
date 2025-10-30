import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { Notification } from "../../../types/notification";

export async function getByUser(
  userId: string,
  limit = 10
): Promise<Notification[]> {
  try {
    const result = await docClient.send(
      new QueryCommand({
        TableName,
        IndexName: "UserIndex",
        KeyConditionExpression: "userId = :u",
        ExpressionAttributeValues: { ":u": userId },
        Limit: limit,
      })
    );
    console.log("✅ Successfully fetched by user from DynamoDB");
    return result.Items as Notification[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("DynamoDB query error:", errorMessage);
    throw new Error("Failed to fetch by user from database: " + errorMessage);
  }
}