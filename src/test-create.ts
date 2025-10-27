import 'dotenv/config';
import { handler } from './index';
import { Notification } from './types/notification';

async function runCreateTests() {
  const printSeparator = () => console.log('\n----------------------------\n');

  const asNotification = (value: any): Notification => {
    if (!value || typeof value !== 'object' || !('id' in value)) {
      throw new Error('Not a Notification');
    }
    return value as Notification;
  };

  // 1. Create a general notification
  console.log('--- General notification ---');
  const result1 = asNotification(await handler({
    fieldName: 'createNotification',
    arguments: { input: { message: 'Test notification', userId: '103', boardId: '503' } },
  }));
  console.log(result1);
  printSeparator();

  // 2. Create a user notification
  console.log('--- User notification ---');
  const result2 = asNotification(await handler({
    fieldName: 'createNotificationForUser',
    arguments: { input: { message: 'User-specific', userId: '104' } },
  }));
  console.log(result2);
  printSeparator();

  // 3. Create a board notification
  console.log('--- Board notification ---');
  const result3 = asNotification(await handler({
    fieldName: 'createNotificationForBoard',
    arguments: { input: { message: 'Board-specific', boardId: '504' } },
  }));
  console.log(result3);
  printSeparator();
}

runCreateTests().catch(console.error);
