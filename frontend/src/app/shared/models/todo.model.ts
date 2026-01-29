export interface Todo {
  id: number;
  createdBy: string;
  title: string;
  description: string;
  createdAt: Date;
  status: 'OPEN' | 'DONE';
}