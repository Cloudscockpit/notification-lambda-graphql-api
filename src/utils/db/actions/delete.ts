import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";
import { notifications } from "../../../data/notifications";


export async function deleteById(id: string): Promise<boolean> {
  try {
    await docClient.send(new DeleteCommand({ TableName, Key: { id } }));
    return true;
  } catch {
    console.warn("Using fake db");
    const index = notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.splice(index, 1);
      return true;
    }
    return false;
  }
}
