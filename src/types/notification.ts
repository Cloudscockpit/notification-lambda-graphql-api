export interface Notification {
  id: string;
  message: string;
  userId?: string | null;
  boardId?: string | null;
  createdAt: string;
}

export interface CreateNotificationInput {
  message: string;
  userId?: string;
  boardId?: string;
}

export interface CreateForUserInput {
  message: string;
  userId: string;
}

// export interface CreateForBoardInput {
//   message: string;
//   boardId: string;
// }
