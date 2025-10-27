import { handler } from './index';
import { Notification } from './types/notification';

async function runDeleteTests() {
  const printSeparator = () => console.log('\n----------------------------\n');

  const asNotifications = (value: any): Notification[] => {
    if (!Array.isArray(value)) return [];
    return value.filter(item => item && 'id' in item) as Notification[];
  };

  let allNotifications = asNotifications(await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  }));

  if (allNotifications.length === 0) {
    console.log('No notifications to delete.');
    return;
  }

  const lastNotification = allNotifications[allNotifications.length - 1];
  const deleted = await handler({
    fieldName: 'deleteNotification',
    arguments: { id: lastNotification.id }
  });
  console.log('Deleted:', deleted);
  printSeparator();

  const remaining = asNotifications(await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  }));
  console.log('Remaining notifications:', remaining);
  printSeparator();
}

runDeleteTests().catch(console.error);
