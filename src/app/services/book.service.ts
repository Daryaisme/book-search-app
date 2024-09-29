import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BookList } from '../types/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly _url = 'https://www.googleapis.com/books/v1/volumes';
  private _http = inject(HttpClient);

  getList(
    searchValue: string,
    page: number,
    limit: number
  ): Observable<BookList> {
    return this._http.get<BookList>(
      `${this._url}?q=${searchValue}&startIndex=${
        limit * (page - 1)
      }&maxResults=${limit}`
    );
  }
}
