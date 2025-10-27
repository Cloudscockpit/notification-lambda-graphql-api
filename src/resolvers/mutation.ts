import { notifications } from '../data/notifications';
import { Notification } from '../types/notification';
import { v4 as uuidv4 } from 'uuid';

export const Mutation = {
  createNotification: ({ message, userId, boardId }: { message: string, userId?: string, boardId?: string }): Notification => {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      userId,
      boardId,
      createdAt: new Date().toISOString(),
    };
    notifications.push(newNotification);
    return newNotification;
  },

  deleteNotification: (id: string): boolean => {
    const index = notifications.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.splice(index, 1);
      return true;
    }
    return false;
  },

  createNotificationForUser: ({ message, userId }: { message: string, userId: string }): Notification => {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      userId,
      createdAt: new Date().toISOString(),
    };
    notifications.push(newNotification);
    return newNotification;
  },

  createNotificationForBoard: ({ message, boardId }: { message: string, boardId: string }): Notification => {
    const newNotification: Notification = {
      id: uuidv4(),
      message,
      boardId,
      createdAt: new Date().toISOString(),
    };
    notifications.push(newNotification);
    return newNotification;
  },
};
