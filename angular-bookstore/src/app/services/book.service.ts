import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../common/book';
import { BookCategory } from '../common/book-category';

@Injectable({
	providedIn: 'root'
})
export class BookService {

	private baseUrl = "http://localhost:8080/api/v1/books";
	private categoryUrl = "http://localhost:8080/api/v1/book-category";

	constructor(private httpClient: HttpClient) { }

	getBooks(theCategoryId: number, currentPage: number, pageSize: number): Observable<GetResponseBooks> {
		const searchUrl = `${this.baseUrl}/search/categoryid?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
		return this.httpClient.get<GetResponseBooks>(searchUrl);
	}

	private getBooksList(searchUrl: string): Observable<Book[]> {
		return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(map(response => response._embedded.books));
	}

	getBookCategories(): Observable<BookCategory[]> {
		return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
			map(response => response._embedded.bookCategory)
		);
	}

	searchBooks(keyword: string): Observable<Book[]> {
		const searchUrl = `${this.baseUrl}/search/searchbykeyword?name=${keyword}`;
		return this.getBooksList(searchUrl);
	}

	get(bookId: number): Observable<Book> {
		const bookDetailUrl = `${this.baseUrl}/${bookId}`;
		return this.httpClient.get<Book>(bookDetailUrl);
	}
}

interface GetResponseBooks {
	_embedded: {
		books: Book[];
	}
	page: {
		size: number,
		totalElements: number,
		totalPages: number,
		number: number
	}
}

interface GetResponseBookCategory {
	_embedded: {
		bookCategory: BookCategory[];
	}
}
