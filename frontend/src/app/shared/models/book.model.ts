export interface Book {
  id?: number;
  title: string;
  isbn: string;
  publisher: string;
  publishedYear: number;
  author: {
    id: number;
  };
}
