import { handler } from './index';

async function runCreateTests() {
  const printSeparator = () => console.log('\n----------------------------\n');

  console.log('Common General notification');
  let result = await handler({
    fieldName: 'createNotification',
    arguments: { input: { message: 'Test notification', userId: '103', boardId: '503' } }
  });
  console.log(result);
  printSeparator();

  console.log('User notification');
  result = await handler({
    fieldName: 'createNotificationForUser',
    arguments: { input: { message: 'User-specific', userId: '104' } }
  });
  console.log(result);
  printSeparator();

  console.log('Board notification');
  result = await handler({
    fieldName: 'createNotificationForBoard',
    arguments: { input: { message: 'Board-specific', boardId: '504' } }
  });
  console.log(result);
  printSeparator();
}

runCreateTests().catch(console.error);
