import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookList } from '../types/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly _url = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  getList(
    searchValue: string,
    page: number,
    limit: number
  ): Observable<BookList> {
    return this.http.get<BookList>(
      `${this._url}?q=${searchValue}&startIndex=${
        limit * (page - 1)
      }&maxResults=${limit}`
    );
  }
}
