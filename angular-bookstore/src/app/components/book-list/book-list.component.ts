import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-book-list',
	templateUrl: './book-grid.component.html',
	styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

	books: Book[];
	currentCategoryId: number;
	searchMode: boolean;
	pageOfItems: Array<Book>;
	pageSize: number = 6;

	constructor(
		private _bookService: BookService,
		private _activatedRoute: ActivatedRoute) { }

	ngOnInit(): void {
		this._activatedRoute.paramMap.subscribe(() => {
			this.listBooks();
		});
	}

	pageClick(pageOfItems: Array<Book>) {
		// update the current page of items
		this.pageOfItems = pageOfItems;
	}

	listBooks() {
		this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');

		if (this.searchMode) {
			// do search task
			this.handleSearchBooks();
		} else {
			// display books based on category
			this.handleListBooks();
		}

	}

	handleListBooks() {
		const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has('id');

		if (hasCategoryId) {
			this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
		} else {
			this.currentCategoryId = 1;
		}

		this._bookService.getBooks(this.currentCategoryId).subscribe(
			data => this.books = data
		);
	}

	handleSearchBooks() {
		const keyword: string = this._activatedRoute.snapshot.paramMap.get('keyword');

		this._bookService.searchBooks(keyword).subscribe(
			data => this.books = data
		);
	}

	updatePageSize(pageSize: number) {
		this.pageSize = pageSize;
		this.listBooks();
	}
}
