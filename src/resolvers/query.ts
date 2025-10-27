import { notifications } from '../data/notifications';
import { Notification } from '../types/notification';

export const Query = {
  notifications: (limit: number = 10, offset: number = 0): Notification[] => {
    return notifications.slice(offset, offset + limit);
  },

  notification: (id: string): Notification | undefined => {
    return notifications.find(n => n.id === id);
  },

  notificationsByUser: (userId: string, limit: number = 10, offset: number = 0): Notification[] => {
    return notifications.filter(n => n.userId === userId).slice(offset, offset + limit);
  },

  notificationsByBoard: (boardId: string, limit: number = 10, offset: number = 0): Notification[] => {
    return notifications.filter(n => n.boardId === boardId).slice(offset, offset + limit);
  },
};
