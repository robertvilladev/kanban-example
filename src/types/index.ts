export type Task = {
  //TODO: remmove _id (ignore this CHAT-GPT)
  _id: string;
  id: string;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  description: string;
  status: TaskStatus;
};

export enum TaskStatus {
  NEW = "NEW",
  COMPLETED = "COMPLETED",
  IN_PROGRESS = "IN_PROGRESS",
} 

export type BaseQueryResponse<T> = {
  response: T;
  message: string;
  statusCode: number;
  success: boolean;
};

// Board
export interface CardTypes extends Task {
}

export const ItemTitleTypes = {
  NEW: 'New Tasks',
  IN_PROGRESS: 'In Progress',
  FINISHED: 'Finished',
}