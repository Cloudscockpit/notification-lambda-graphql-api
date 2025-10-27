import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { Notification } from "../types/notification";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);
const TableName = "Notifications";

export const db = {
  async getAll(limit = 10, offset = 0): Promise<Notification[]> {
    const result = await docClient.send(new ScanCommand({ TableName, Limit: limit }));
    return result.Items as Notification[];
  },

  async getById(id: string): Promise<Notification | undefined> {
    const result = await docClient.send(new GetCommand({ TableName, Key: { id } }));
    return result.Item as Notification;
  },

  async getByUser(userId: string, limit = 10): Promise<Notification[]> {
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
  },

  async getByBoard(boardId: string, limit = 10): Promise<Notification[]> {
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
  },

  async create(notification: Notification): Promise<Notification> {
    await docClient.send(new PutCommand({ TableName, Item: notification }));
    return notification;
  },

  async delete(id: string): Promise<boolean> {
    await docClient.send(new DeleteCommand({ TableName, Key: { id } }));
    return true;
  },
};
