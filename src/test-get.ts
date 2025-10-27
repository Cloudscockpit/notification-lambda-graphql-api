import { handler } from './index';
import { Notification } from './types/notification';

async function runGetTests() {
  const printSeparator = () => console.log('\n----------------------------\n');

  const asNotifications = (value: any): Notification[] => {
    if (!Array.isArray(value)) return [];
    return value.filter(item => item && 'id' in item) as Notification[];
  };

  const asNotification = (value: any): Notification | undefined => {
    if (!value || typeof value !== 'object' || !('id' in value)) return undefined;
    return value as Notification;
  };

  console.log('--- All notifications ---');
  const allRaw = await handler({ fieldName: 'notifications', arguments: { limit: 10, offset: 0 } });
  const allNotifications = asNotifications(allRaw);
  console.log(allNotifications);
  printSeparator();

  const firstId = allNotifications[0]?.id;
  if (firstId) {
    console.log('--- Notification by ID ---');
    const notificationRaw = await handler({ fieldName: 'notification', arguments: { id: firstId } });
    const notification = asNotification(notificationRaw);
    console.log(notification);
    printSeparator();
  }

  console.log('--- Notifications by User ---');
  const byUserRaw = await handler({ fieldName: 'notificationsByUser', arguments: { userId: '103', limit: 10, offset: 0 } });
  const byUser = asNotifications(byUserRaw);
  console.log(byUser);
  printSeparator();

  console.log('--- Notifications by Board ---');
  const byBoardRaw = await handler({ fieldName: 'notificationsByBoard', arguments: { boardId: '503', limit: 10, offset: 0 } });
  const byBoard = asNotifications(byBoardRaw);
  console.log(byBoard);
  printSeparator();
}

runGetTests().catch(console.error);
