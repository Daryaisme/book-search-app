import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookList, DetailedBook } from '../types/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly _url = 'https://openlibrary.org';

  constructor(private http: HttpClient) {}

  getList(
    searchValue: string,
    page: number,
    limit: number
  ): Observable<BookList> {
    return this.http.get<BookList>(
      `${this._url}/search.json?q=${searchValue}&page=${page}&limit=${limit}`
    );
  }

  get(key: string): Observable<DetailedBook> {
    return this.http.get<DetailedBook>(`${this._url}${key}.json`);
  }
}
