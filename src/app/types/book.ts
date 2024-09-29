export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description?: string;
    pageCount?: number;
    printType: string;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    imageLinks?: {
      thumbnail?: string;
      large?: string;
    };
  };
}

export interface BookList {
  items: Book[];
  totalItems: number;
}
