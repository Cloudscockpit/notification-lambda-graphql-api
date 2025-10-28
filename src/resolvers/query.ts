import { Notification } from '../types/notification';
import { notifications } from '../data/notifications';
import { getAll } from '../utils/db/actions/getAll';
import { getById } from '../utils/db/actions/getById';
import { getByUser } from '../utils/db/actions/getByUser';
import { getByBoard } from '../utils/db/actions/getByBoard';

export const Query = {
  async notifications(limit: number = 10, offset: number = 0): Promise<Notification[]> {
    try {
      const result = await getAll(limit, offset);
      return result;
    } catch (err) {
      console.warn(' DynamoDB unavailable, using local fallback');
      return notifications.slice(offset, offset + limit);
    }
  },

  async notification(id: string): Promise<Notification | undefined> {
    try {
      return await getById(id);
    } catch (err) {
      console.warn(' DynamoDB unavailable, using local fallback');
      return notifications.find((n) => n.id === id);
    }
  },

  async notificationsByUser(userId: string, limit: number = 10, offset: number = 0): Promise<Notification[]> {
    try {
      return await getByUser(userId, limit);
    } catch (err) {
      console.warn(' DynamoDB unavailable, using local fallback');
      return notifications.filter((n) => n.userId === userId).slice(offset, offset + limit);
    }
  },

  async notificationsByBoard(boardId: string, limit: number = 10, offset: number = 0): Promise<Notification[]> {
    try {
      return await getByBoard(boardId, limit);
    } catch (err) {
      console.warn(' DynamoDB unavailable, using local fallback');
      return notifications.filter((n) => n.boardId === boardId).slice(offset, offset + limit);
    }
  },
};
