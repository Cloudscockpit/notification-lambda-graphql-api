import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { notifications } from "../../../data/notifications";
import { Notification } from "../../../types/notification";


export async function create(notification: Notification): Promise<Notification> {
  try {
    await docClient.send(new PutCommand({ TableName, Item: notification }));
  } catch {
    console.warn("Using fake db");
    notifications.push(notification);
  }
  return notification;
}
