package com.example.onlinebookstore.repositories;

import com.example.onlinebookstore.model.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
}
