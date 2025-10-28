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
import { notifications } from "../data/notifications";
import { envConfig } from "../config";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const docClient = DynamoDBDocumentClient.from(client);
const TableName = envConfig.notifications || "Notifications";

export const db = {
  async getAll(limit = 10, offset = 0): Promise<Notification[]> {
    try {
      const result = await docClient.send(
        new ScanCommand({ TableName, Limit: limit })
      );
      return result.Items as Notification[];
    } catch (err) {
      console.warn("Using fake db");
      return notifications.slice(offset, offset + limit);
    }
  },

  async getById(id: string): Promise<Notification | undefined> {
    try {
      const result = await docClient.send(
        new GetCommand({ TableName, Key: { id } })
      );
      return result.Item as Notification;
    } catch (err) {
      console.warn("Using fake db");
      return notifications.find((n) => n.id === id);
    }
  },

  async getByUser(userId: string, limit = 10): Promise<Notification[]> {
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
    } catch (err) {
      console.warn("Using fake db");
      return notifications.filter((n) => n.userId === userId).slice(0, limit);
    }
  },

  async getByBoard(boardId: string, limit = 10): Promise<Notification[]> {
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
    } catch (err) {
      console.warn("Using fake db");
      return notifications.filter((n) => n.boardId === boardId).slice(0, limit);
    }
  },

  async create(notification: Notification): Promise<Notification> {
    try {
      await docClient.send(new PutCommand({ TableName, Item: notification }));
    } catch {
      console.warn("Using fake db");
      notifications.push(notification);
    }
    return notification;
  },

  async delete(id: string): Promise<boolean> {
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
  },
};
