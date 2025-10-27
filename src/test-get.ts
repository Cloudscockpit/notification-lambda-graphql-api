import { handler } from './index';
import { Notification } from './types/notification';

async function runGetTests() {
  const printSeparator = () => console.log('\n----------------------------\n');

  const resultRaw = await handler({
    fieldName: 'notifications',
    arguments: { limit: 10, offset: 0 }
  });

  const result: Notification[] = Array.isArray(resultRaw) ? resultRaw : [];
  console.log(result);
  printSeparator();

  const firstId = result.length > 0 ? result[0].id : undefined;
  if (firstId) {
    console.log('--- Get notification by ID ---');
    const notificationById = await handler({
      fieldName: 'notification',
      arguments: { id: firstId }
    });
    console.log(notificationById);
    printSeparator();
  }

  const byUserRaw = await handler({
    fieldName: 'notificationsByUser',
    arguments: { userId: '103', limit: 10, offset: 0 }
  });
  const byUser: Notification[] = Array.isArray(byUserRaw) ? byUserRaw : [];
  console.log(byUser);
  printSeparator();

  const byBoardRaw = await handler({
    fieldName: 'notificationsByBoard',
    arguments: { boardId: '503', limit: 10, offset: 0 }
  });
  const byBoard: Notification[] = Array.isArray(byBoardRaw) ? byBoardRaw : [];
  console.log(byBoard);
  printSeparator();
}

runGetTests().catch(console.error);
