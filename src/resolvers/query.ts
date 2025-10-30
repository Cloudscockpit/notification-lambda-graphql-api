import { Notification } from '../types/notification';
import { getAll } from '../utils/db/actions/getAll';
import { getById } from '../utils/db/actions/getById';
import { getByUser } from '../utils/db/actions/getByUser';
import { getByBoard } from '../utils/db/actions/getByBoard';

export const Query = {
  async notifications(limit: number = 10, offset: number = 0): Promise<Notification[]> {
    return await getAll(limit, offset);
  },

  async notification(id: string): Promise<Notification | undefined> {
    return await getById(id);
  },

  async notificationsByUser(userId: string, limit: number = 10, offset: number = 0): Promise<Notification[]> {
    return await getByUser(userId, limit);
  },

  async notificationsByBoard(boardId: string, limit: number = 10, offset: number = 0): Promise<Notification[]> {
    return await getByBoard(boardId, limit);
  },
};