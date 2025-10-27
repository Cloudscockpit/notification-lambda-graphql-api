import { Notification } from '../types/notification';

export const notifications: Notification[] = [
  {
    id: '1',
    message: 'Welcome to the workspace.',
    userId: '101',
    boardId: '501',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    message: 'You have a new task assigned.',
    userId: '102',
    boardId: '502',
    createdAt: new Date().toISOString(),
  },
];
