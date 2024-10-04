export interface Book {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: number;
  cover_edition_key?: string;
  ratings_average?: number;
  ratings_count?: number;
  number_of_pages_median?: number;
}

export interface DetailedBook {
  title: string;
  subtitle?: string;
  first_publish_date?: string;
  subjects?: string[];
  subject_places?: string[];
  subject_people?: string[];
  subject_times?: string[];
}

export interface BookList {
  numFound: number;
  docs: Book[];
}
