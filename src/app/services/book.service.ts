import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BookList, DetailedBook } from '../types/book';

const books = [
	{
		key: '1',
		title: 'The Great Gatsby',
		author_name: [ 'F. Scott Fitzgerald' ],
		first_publish_year: 1925,
		cover_edition_key: 'OL15371414W',
		ratings_average: 4.2,
		ratings_count: 2100,
		number_of_pages_median: 180,
		subtitle: 'A Novel',
		first_publish_date: '1925-04-10',
		subjects: [ 'American literature' ],
		subject_places: [ 'New York' ],
		subject_people: [ 'Jay Gatsby' ],
		subject_times: [ '1920s' ],
		cover_url:
			'https://books.google.com/books/content?id=lXhGAAAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '2',
		title: 'To Kill a Mockingbird',
		author_name: [ 'Harper Lee' ],
		first_publish_year: 1960,
		cover_edition_key: 'OL3947511W',
		ratings_average: 4.5,
		ratings_count: 3400,
		number_of_pages_median: 281,
		first_publish_date: '1960-07-11',
		subjects: [ 'American literature', 'Social issues' ],
		subject_places: [ 'Maycomb' ],
		subject_people: [ 'Atticus Finch' ],
		subject_times: [ '1930s' ],
		cover_url:
			'https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '3',
		title: '1984',
		author_name: [ 'George Orwell' ],
		first_publish_year: 1949,
		cover_edition_key: 'OL27200415W',
		ratings_average: 4.4,
		ratings_count: 3000,
		number_of_pages_median: 328,
		first_publish_date: '1949-06-08',
		subjects: [ 'Dystopia', 'Totalitarianism' ],
		subject_places: [ 'Oceania' ],
		subject_people: [ 'Big Brother' ],
		subject_times: [ 'Future' ],
		cover_url:
			'https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '4',
		title: 'Brave New World',
		author_name: [ 'Aldous Huxley' ],
		first_publish_year: 1932,
		cover_edition_key: 'OL27958817W',
		ratings_average: 4.3,
		ratings_count: 2300,
		number_of_pages_median: 268,
		first_publish_date: '1932-08-01',
		subjects: [ 'Dystopia', 'Science fiction' ],
		subject_places: [ 'World State' ],
		subject_people: [ 'John the Savage' ],
		subject_times: [ 'Future' ],
		cover_url:
			'https://books.google.com/books/content?id=ekbRs5SdedMC&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '5',
		title: 'Moby-Dick',
		author_name: [ 'Herman Melville' ],
		first_publish_year: 1851,
		cover_edition_key: 'OL11620143W',
		ratings_average: 3.8,
		ratings_count: 1700,
		number_of_pages_median: 635,
		first_publish_date: '1851-10-18',
		subjects: [ 'Adventure', 'Whaling' ],
		subject_places: [ 'Pacific Ocean' ],
		subject_people: [ 'Captain Ahab', 'Ishmael' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=fdFzCwAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '6',
		title: 'Pride and Prejudice',
		author_name: [ 'Jane Austen' ],
		first_publish_year: 1813,
		cover_edition_key: 'OL7932357W',
		ratings_average: 4.3,
		ratings_count: 2600,
		number_of_pages_median: 432,
		first_publish_date: '1813-01-28',
		subjects: [ 'Romance', 'Social class' ],
		subject_places: [ 'England' ],
		subject_people: [ 'Elizabeth Bennet', 'Mr. Darcy' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=eiY0CwAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '7',
		title: 'War and Peace',
		author_name: [ 'Leo Tolstoy' ],
		first_publish_year: 1869,
		cover_edition_key: 'OL2063247W',
		ratings_average: 4.1,
		ratings_count: 2200,
		number_of_pages_median: 1225,
		first_publish_date: '1869-01-01',
		subjects: [ 'War', 'Russia' ],
		subject_places: [ 'Russia' ],
		subject_people: [ 'Pierre Bezukhov', 'Andrei Bolkonsky' ],
		subject_times: [ 'Napoleonic Wars' ],
		cover_url:
			'https://books.google.com/books/content?id=l-s8DwAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '8',
		title: 'Crime and Punishment',
		author_name: [ 'Fyodor Dostoevsky' ],
		first_publish_year: 1866,
		cover_edition_key: 'OL7346451W',
		ratings_average: 4.2,
		ratings_count: 2900,
		number_of_pages_median: 671,
		first_publish_date: '1866-01-01',
		subjects: [ 'Psychological fiction' ],
		subject_places: [ 'St. Petersburg' ],
		subject_people: [ 'Raskolnikov' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=KUlq1bwhDKoC&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '9',
		title: 'The Catcher in the Rye',
		author_name: [ 'J.D. Salinger' ],
		first_publish_year: 1951,
		cover_edition_key: 'OL7024926W',
		ratings_average: 3.9,
		ratings_count: 1900,
		number_of_pages_median: 277,
		first_publish_date: '1951-07-16',
		subjects: [ 'Coming of age' ],
		subject_places: [ 'New York' ],
		subject_people: [ 'Holden Caulfield' ],
		subject_times: [ '1950s' ],
		cover_url:
			'https://books.google.com/books/content?id=uB0iAQAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '10',
		title: 'The Hobbit',
		author_name: [ 'J.R.R. Tolkien' ],
		first_publish_year: 1937,
		cover_edition_key: 'OL26501029W',
		ratings_average: 4.7,
		ratings_count: 4700,
		number_of_pages_median: 310,
		first_publish_date: '1937-09-21',
		subjects: [ 'Fantasy' ],
		subject_places: [ 'Middle-earth' ],
		subject_people: [ 'Bilbo Baggins' ],
		subject_times: [ 'Third Age' ],
		cover_url:
			'https://books.google.com/books/content?id=JsbmBQAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '11',
		title: 'Fahrenheit 451',
		author_name: [ 'Ray Bradbury' ],
		first_publish_year: 1953,
		cover_edition_key: 'OL18852666W',
		ratings_average: 4.0,
		ratings_count: 2500,
		number_of_pages_median: 249,
		first_publish_date: '1953-10-19',
		subjects: [ 'Dystopia', 'Censorship' ],
		subject_places: [ 'Future' ],
		subject_people: [ 'Guy Montag' ],
		subject_times: [ 'Future' ],
		cover_url:
			'https://books.google.com/books/content?id=wKddDwAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '12',
		title: 'The Lord of the Rings',
		author_name: [ 'J.R.R. Tolkien' ],
		first_publish_year: 1954,
		cover_edition_key: 'OL16682709W',
		ratings_average: 4.9,
		ratings_count: 6000,
		number_of_pages_median: 1137,
		first_publish_date: '1954-07-29',
		subjects: [ 'Fantasy' ],
		subject_places: [ 'Middle-earth' ],
		subject_people: [ 'Frodo Baggins', 'Sauron' ],
		subject_times: [ 'Third Age' ],
		cover_url:
			'https://books.google.com/books/content?id=sVoFQgAACAAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '13',
		title: 'Jane Eyre',
		author_name: [ 'Charlotte Brontë' ],
		first_publish_year: 1847,
		cover_edition_key: 'OL7353617W',
		ratings_average: 4.1,
		ratings_count: 2800,
		number_of_pages_median: 507,
		first_publish_date: '1847-10-16',
		subjects: [ 'Gothic fiction', 'Romance' ],
		subject_places: [ 'England' ],
		subject_people: [ 'Jane Eyre', 'Mr. Rochester' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=OD9n_5Fq9y0C&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '14',
		title: 'The Picture of Dorian Gray',
		author_name: [ 'Oscar Wilde' ],
		first_publish_year: 1890,
		cover_edition_key: 'OL8046834W',
		ratings_average: 4.0,
		ratings_count: 3200,
		number_of_pages_median: 254,
		first_publish_date: '1890-06-20',
		subjects: [ 'Philosophical fiction' ],
		subject_places: [ 'London' ],
		subject_people: [ 'Dorian Gray' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=HQ6KAwAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '15',
		title: 'Wuthering Heights',
		author_name: [ 'Emily Brontë' ],
		first_publish_year: 1847,
		cover_edition_key: 'OL5818280W',
		ratings_average: 4.0,
		ratings_count: 3100,
		number_of_pages_median: 416,
		first_publish_date: '1847-12-01',
		subjects: [ 'Gothic fiction', 'Romance' ],
		subject_places: [ 'Yorkshire' ],
		subject_people: [ 'Heathcliff', 'Catherine Earnshaw' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=JcT7rgEACAAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '16',
		title: 'The Brothers Karamazov',
		author_name: [ 'Fyodor Dostoevsky' ],
		first_publish_year: 1880,
		cover_edition_key: 'OL7353620W',
		ratings_average: 4.5,
		ratings_count: 2200,
		number_of_pages_median: 796,
		first_publish_date: '1880-11-01',
		subjects: [ 'Philosophical fiction' ],
		subject_places: [ 'Russia' ],
		subject_people: [ 'Karamazov brothers' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=lT4rAQAAMAAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '17',
		title: 'The Grapes of Wrath',
		author_name: [ 'John Steinbeck' ],
		first_publish_year: 1939,
		cover_edition_key: 'OL27364435W',
		ratings_average: 4.2,
		ratings_count: 2300,
		number_of_pages_median: 464,
		first_publish_date: '1939-04-14',
		subjects: [ 'Great Depression', 'Social issues' ],
		subject_places: [ 'Oklahoma', 'California' ],
		subject_people: [ 'Tom Joad' ],
		subject_times: [ '1930s' ],
		cover_url:
			'https://books.google.com/books/content?id=W0N-H5gRxaAC&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '18',
		title: 'One Hundred Years of Solitude',
		author_name: [ 'Gabriel García Márquez' ],
		first_publish_year: 1967,
		cover_edition_key: 'OL19246157W',
		ratings_average: 4.6,
		ratings_count: 5000,
		number_of_pages_median: 417,
		first_publish_date: '1967-06-05',
		subjects: [ 'Magical realism' ],
		subject_places: [ 'Macondo' ],
		subject_people: [ 'Buendía family' ],
		subject_times: [ 'Colonial era' ],
		cover_url:
			'https://books.google.com/books/content?id=_YzBDwAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '19',
		title: 'Moby Dick',
		author_name: [ 'Herman Melville' ],
		first_publish_year: 1851,
		cover_edition_key: 'OL7354472W',
		ratings_average: 3.9,
		ratings_count: 2800,
		number_of_pages_median: 720,
		first_publish_date: '1851-11-14',
		subjects: [ 'Adventure', 'Whaling' ],
		subject_places: [ 'Pacific Ocean' ],
		subject_people: [ 'Captain Ahab', 'Ishmael' ],
		subject_times: [ '19th century' ],
		cover_url:
			'https://books.google.com/books/content?id=Z0s0AQAAMAAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '20',
		title: 'The Old Man and the Sea',
		author_name: [ 'Ernest Hemingway' ],
		first_publish_year: 1952,
		cover_edition_key: 'OL8796148W',
		ratings_average: 4.1,
		ratings_count: 3600,
		number_of_pages_median: 127,
		first_publish_date: '1952-09-01',
		subjects: [ 'Adventure', 'Literary fiction' ],
		subject_places: [ 'Cuba' ],
		subject_people: [ 'Santiago' ],
		subject_times: [ '20th century' ],
		cover_url:
			'https://books.google.com/books/content?id=QMPAAgAAQBAJ&printsec=frontcover&img=1&zoom=1',
	},
	{
		key: '21',
		title: 'The Stranger',
		author_name: [ 'Albert Camus' ],
		first_publish_year: 1942,
		cover_edition_key: 'OL17968434W',
		ratings_average: 4.0,
		ratings_count: 3400,
		number_of_pages_median: 123,
		first_publish_date: '1942-05-01',
		subjects: [ 'Existentialism', 'Absurdism' ],
		subject_places: [ 'Algeria' ],
		subject_people: [ 'Meursault' ],
		subject_times: [ '20th century' ],
		cover_url:
			'https://books.google.com/books/content?id=K_LA2rL5-6QC&printsec=frontcover&img=1&zoom=1',
	},
];

@Injectable({
	providedIn: 'root',
})
export class BookService {
	private readonly _url = 'https://openlibrary.org';

	constructor(private http: HttpClient) {
	}

	getList(
		searchValue: string,
		page: number,
		limit: number
	): Observable<BookList> {
		// return this.http.get<BookList>(
		//   `${this._url}/search.json?q=${searchValue}&page=${page}&limit=${limit}`
		// );

		const filteredBooks = books.filter((book) =>
			book.title.toLowerCase().includes(searchValue.toLowerCase())
		);

		return searchValue.length > 0
			? of({
				numFound: filteredBooks.length,
				docs: filteredBooks.slice((page - 1) * limit, page * limit),
			})
			: of({ numFound: 0, docs: [] });
	}

	get(key: string): Observable<DetailedBook> {
		// return this.http.get<DetailedBook>(`${this._url}${key}.json`);

		return of(books.find((book) => book.key === key) as DetailedBook);
	}
}
