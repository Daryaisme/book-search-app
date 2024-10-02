import type { ColumnDef } from '@tanstack/angular-table';
import { Book } from '../../types/book';

export const COLUMNS: ColumnDef<Book>[] = [
  {
    accessorKey: 'volumeInfo.imageLinks.thumbnail',
    header: 'cover',
    cell: (props) => {
      const imgSrc = props.getValue();

      return `<img src="${imgSrc}" alt="book cover" />`;
    },
  },
  {
    accessorKey: 'volumeInfo.title',
    header: 'title',
    cell: (props) => props.getValue(),
  },
  {
    accessorKey: 'volumeInfo.authors',
    header: 'author',
    cell: (props) => props.getValue().join(', '),
  },
  {
    accessorKey: 'volumeInfo.categories',
    header: 'category',
    cell: (props) => props.getValue().join(', '),
  },
  {
    accessorKey: 'volumeInfo.averageRating',
    header: 'rating',
    cell: (props) => props.getValue(),
  },
];
