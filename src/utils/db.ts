// import { notifications } from '../data/notifications';
// import { Notification } from '../types/notification';

// export const db = {
//   notifications,

//   getAll: (limit: number, offset: number): Notification[] =>
//     notifications.slice(offset, offset + limit),

//   getById: (id: string): Notification | undefined =>
//     notifications.find((n) => n.id === id),

//   getByUser: (userId: string, limit: number, offset: number): Notification[] =>
//     notifications.filter((n) => n.userId === userId).slice(offset, offset + limit),

//   getByBoard: (boardId: string, limit: number, offset: number): Notification[] =>
//     notifications.filter((n) => n.boardId === boardId).slice(offset, offset + limit),

//   add: (notification: Notification): Notification => {
//     notifications.push(notification);
//     return notification;
//   },

//   delete: (id: string): boolean => {
//     const index = notifications.findIndex((n) => n.id === id);
//     if (index === -1) return false;
//     notifications.splice(index, 1);
//     return true;
//   },
// };
