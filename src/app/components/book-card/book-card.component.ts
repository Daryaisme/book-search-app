import { Component, Input } from '@angular/core';
import { Book } from '../../types/book';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
}
