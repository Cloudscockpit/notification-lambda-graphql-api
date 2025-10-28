import { Notification } from "../types/notification";
import { v4 as uuidv4 } from "uuid";
import { notifications } from "../data/notifications";
import { create } from "../utils/db/actions/create";
import { deleteById } from "../utils/db/actions/delete";

export const Mutation = {
  async createNotification({
    message,
    userId,
    boardId,
  }: {
    message: string;
    userId?: string;
    boardId?: string;
  }): Promise<Notification> {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      userId,
      boardId,
      createdAt: new Date().toISOString(),
    };

    try {
      await create(newNotification);
    } catch (err) {
      console.warn("DynamoDB unavailable, using local fallback");
      notifications.push(newNotification);
    }

    return newNotification;
  },

  async deleteNotification(id: string): Promise<boolean> {
    try {
      return await deleteById(id);
    } catch (err) {
      console.warn("DynamoDB unavailable, using local fallback");
      const index = notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        notifications.splice(index, 1);
        return true;
      }
      return false;
    }
  },

  async createNotificationForUser({
    message,
    userId,
  }: {
    message: string;
    userId: string;
  }): Promise<Notification> {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      userId,
      createdAt: new Date().toISOString(),
    };

    try {
      await create(newNotification);
    } catch (err) {
      console.warn("DynamoDB unavailable, using local fallback");
      notifications.push(newNotification);
    }

    return newNotification;
  },

  async createNotificationForBoard({
    message,
    boardId,
  }: {
    message: string;
    boardId: string;
  }): Promise<Notification> {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      boardId,
      createdAt: new Date().toISOString(),
    };

    try {
      await create(newNotification);
    } catch (err) {
      console.warn("DynamoDB unavailable, using local fallback");
      notifications.push(newNotification);
    }

    return newNotification;
  },
};
