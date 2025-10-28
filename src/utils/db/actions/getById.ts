import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { notifications } from "../../../data/notifications";
import { Notification } from "../../../types/notification";

export async function getById(id: string): Promise<Notification | undefined> {
  try {
    const result = await docClient.send(
      new GetCommand({ TableName, Key: { id } })
    );
    return result.Item as Notification;
  } catch {
    console.warn("Using fake db");
    return notifications.find((n) => n.id === id);
  }
}
