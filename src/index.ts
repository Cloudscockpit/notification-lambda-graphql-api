import { Query } from './resolvers/query';
import { Mutation } from './resolvers/mutation';
import 'dotenv/config';

export const handler = async (event: any) => {
  try {
    const { fieldName, arguments: args } = event;

    switch (fieldName) {
      case 'notifications':
        return await Query.notifications(args?.limit, args?.offset);

      case 'notification':
        return await Query.notification(args?.id);

      case 'notificationsByUser':
        return await Query.notificationsByUser(args?.userId, args?.limit, args?.offset);

      case 'notificationsByBoard':
        return await Query.notificationsByBoard(args?.boardId, args?.limit, args?.offset);
        
      case 'createNotification':
        return await Mutation.createNotification(args?.input);

      case 'deleteNotification':
        return await Mutation.deleteNotification(args?.id);

      case 'createNotificationForUser':
        return await Mutation.createNotificationForUser(args?.input);

      case 'createNotificationForBoard':
        return await Mutation.createNotificationForBoard(args?.input);

      default:
        throw new Error(`Unknown field: ${fieldName}`);
    }
  } catch (error: any) {
    console.error('Handler error:', error);
    return { error: error.message || 'Unexpected error occurred' };
  }
};
