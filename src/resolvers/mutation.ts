
import { randomUUID } from "crypto";
import { Notification } from "../types/notification";
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
      id: randomUUID(),
      message,
      userId,
      boardId,
      createdAt: new Date().toISOString(),
    };

    await create(newNotification);
    return newNotification;
  },

  async deleteNotification(id: string): Promise<boolean> {
    return await deleteById(id);
  },

  async createNotificationForUser({
    message,
    userId,
  }: {
    message: string;
    userId: string;
  }): Promise<Notification> {
    const newNotification: Notification = {
      id: randomUUID(),
      message,
      userId,
      createdAt: new Date().toISOString(),
    };

    await create(newNotification);
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
      id: randomUUID(),
      message,
      boardId,
      createdAt: new Date().toISOString(),
    };

    await create(newNotification);
    return newNotification;
  },
};