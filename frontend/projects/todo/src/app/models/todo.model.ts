export interface Todo {
  id?: number;
  title: string;
  description?: string;
  status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  dueDate?: Date;
  createdDate?: Date;
  updatedDate?: Date;
}