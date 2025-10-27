import { handler } from './index';

async function runTests() {
  // Helper to print a separator
  const printSeparator = () => console.log('\n----------------------------\n');

  // 1. Get all notifications
  console.log('--- Get all notifications ---');
  let result = await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  });
  console.log(result);
  printSeparator();

  // 2. Get notification by ID
  console.log('--- Get notification by ID ---');
  result = await handler({
    fieldName: 'notification',
    arguments: { id: '1' }
  });
  console.log(result);
  printSeparator();

  // 3. Create general notification
  console.log('--- Create general notification ---');
  result = await handler({
    fieldName: 'createNotification',
    arguments: { input: { message: 'Test notification', userId: '103', boardId: '503' } }
  });
  console.log(result);

  // Print all notifications
  const allNotifications1 = await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  });
  console.log('All notifications:', allNotifications1);
  printSeparator();

  // 4. Create notification for user
  console.log('--- Create notification for user ---');
  result = await handler({
    fieldName: 'createNotificationForUser',
    arguments: { input: { message: 'User-specific', userId: '104' } }
  });
  console.log(result);

  // Print all notifications
  const allNotifications2 = await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  });
  console.log('All notifications:', allNotifications2);
  printSeparator();

  // 5. Create notification for board
  console.log('--- Create notification for board ---');
  result = await handler({
    fieldName: 'createNotificationForBoard',
    arguments: { input: { message: 'Board-specific', boardId: '504' } }
  });
  console.log(result);

  // Print all notifications
  const allNotifications3 = await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  });
  console.log('All notifications:', allNotifications3);
  printSeparator();

  // 6. Delete the last created board notification
  console.log('--- Delete last created board notification ---');
  const lastNotification = result as any; // cast to any for TS safety
  const deleteId = lastNotification?.id;

  if (deleteId) {
    const deleted = await handler({
      fieldName: 'deleteNotification',
      arguments: { id: deleteId }
    });
    console.log('Deleted:', deleted);

    // Print all notifications after deletion
    const allNotificationsAfterDelete = await handler({
      fieldName: 'notifications',
      arguments: { limit: 10, offset: 0 }
    });
    console.log('All notifications after deletion:', allNotificationsAfterDelete);
  } else {
    console.log('No notification to delete');
  }
  printSeparator();
}

runTests().catch(console.error);
