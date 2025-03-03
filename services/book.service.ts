import { Book } from "../models/book.model.ts";
import { books } from "../repositories/book.repository.ts";

export class BookService {
    getAllBooks(): Book[] {
        return books;
    }

    getBookById(id: number): Book | undefined {
        return books.find(book => book.id === id);
    }

    createBook(newBook: Book): Book {
        newBook.id = books.length ? books[books.length - 1].id + 1 : 1; // Générer un nouvel ID
        books.push(newBook);
        return newBook;
    }

    updateBook(id: number, updatedData: Partial<Book>): Book | null {
        const index = books.findIndex(book => book.id === id);
        if (index === -1) return null;

        books[index] = { ...books[index], ...updatedData };
        return books[index];
    }

    deleteBook(id: number): boolean {
        const index = books.findIndex(book => book.id === id);
        if (index === -1) return false;

        books.splice(index, 1); // Supprimer le livre du tableau
        return true;
    }
}
