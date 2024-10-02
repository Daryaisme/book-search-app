import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookList } from '../types/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly _url = 'https://openlibrary.org/';

  constructor(private http: HttpClient) {}

  getList(
    searchValue: string,
    page: number,
    limit: number
  ): Observable<BookList> {
    return this.http.get<BookList>(
      `${this._url}search.json?q=${searchValue}&page=${page}&limit=${limit}`
    );
  }
}
