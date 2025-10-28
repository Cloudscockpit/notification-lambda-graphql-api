import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { Notification } from "../../../types/notification";
import { notifications } from "../../../data/notifications";

export async function getAll(limit = 10, offset = 0): Promise<Notification[]> {
  try {
    const result = await docClient.send(
      new ScanCommand({ TableName, Limit: limit })
    );
    return result.Items as Notification[];
  } catch {
    console.warn("Using fake db");
    return notifications.slice(offset, offset + limit);
  }
}
