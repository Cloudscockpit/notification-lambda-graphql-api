import { Query } from './resolvers/query';
import { Mutation } from './resolvers/mutation';

export const handler = async (event: any) => {
  const { fieldName, arguments: args } = event;

  switch (fieldName) {
    case 'notifications':
      return Query.notifications(args.limit, args.offset);

    case 'notification':
      return Query.notification(args.id);

    case 'notificationsByUser':
      return Query.notificationsByUser(args.userId, args.limit, args.offset);

    case 'notificationsByBoard':
      return Query.notificationsByBoard(args.boardId, args.limit, args.offset);

    case 'createNotification':
      return Mutation.createNotification(args.input);

    case 'deleteNotification':
      return Mutation.deleteNotification(args.id);

    case 'createNotificationForUser':
      return Mutation.createNotificationForUser(args.input);

    case 'createNotificationForBoard':
      return Mutation.createNotificationForBoard(args.input);

    default:
      throw new Error(`Unknown field: ${fieldName}`);
  }
};
