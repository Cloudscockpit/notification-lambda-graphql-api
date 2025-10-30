import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TableName } from "../client";

export async function deleteById(id: string): Promise<boolean> {
  try {
    await docClient.send(new DeleteCommand({ TableName, Key: { id } }));
    console.log("✅ Successfully deleted from DynamoDB");
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ DynamoDB delete error:", errorMessage);
    throw new Error("Failed to delete from database: " + errorMessage);
  }
}