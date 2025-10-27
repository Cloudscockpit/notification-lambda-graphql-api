import { handler } from './index';

async function runDeleteTests() {
  const printSeparator = () => console.log('\n----------------------------\n');

  let allNotifications: any = await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  });

  const lastNotification = allNotifications[allNotifications.length - 1];
  if (!lastNotification) {
    console.log('No notifications to delete.');
    return;
  }

  const deleted = await handler({
    fieldName: 'deleteNotification',
    arguments: { id: lastNotification.id }
  });
  console.log('Deleted:', deleted);
  printSeparator();

  const remaining = await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  });
  console.log('Remaining notifications:', remaining);
}

runDeleteTests().catch(console.error);
