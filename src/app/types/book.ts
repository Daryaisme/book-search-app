// export interface Book {
//   id: string;
//   volumeInfo: {
//     title: string;
//     authors: string[];
//     publisher: string;
//     publishedDate: string;
//     description?: string;
//     pageCount?: number;
//     printType: string;
//     categories?: string[];
//     averageRating?: number;
//     ratingsCount?: number;
//     imageLinks?: {
//       thumbnail?: string;
//       large?: string;
//     };
//   };
// }

export interface Book {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  cover_edition_key?: string;
  ratings_average?: number;
  ratings_count?: number;
  language?: string[];
  number_of_pages_median?: number;
}

export interface BookDetailed {
  title: string;
  description: string;
  subjects?: string[];
  subject_places?: string[];
  subject_people?: string[];
  subject_times?: string[];
}

// export interface BookList {
//   items: Book[];
//   totalItems: number;
// }

export interface BookList {
  numFound: number;
  docs: Book[];
}
