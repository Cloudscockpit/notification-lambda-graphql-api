import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { notifications } from "../../../data/notifications";
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
    return result.Items as Notification[];
  } catch {
    console.warn("Using fake db");
    return notifications.filter((n) => n.boardId === boardId).slice(0, limit);
  }
}
