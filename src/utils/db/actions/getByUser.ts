import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { notifications } from "../../../data/notifications";
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
    return result.Items as Notification[];
  } catch {
    console.warn("Using fake db");
    return notifications.filter((n) => n.userId === userId).slice(0, limit);
  }
}
