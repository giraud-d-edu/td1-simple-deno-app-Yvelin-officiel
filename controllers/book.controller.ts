import { RouterContext } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BookService } from "../services/book.service.ts";
import { Book } from "../models/book.model.ts";

const bookService = new BookService();

export class BookController {
    static async getBooks(ctx: RouterContext<"/books">) {
        ctx.response.body = bookService.getAllBooks();
    }

    static async getBookById(ctx: RouterContext<"/books/:id", { id: string }>) {
        const id = ctx.params.id ? parseInt(ctx.params.id) : NaN;
        const book = bookService.getBookById(id);
        if (book) {
            ctx.response.body = book;
        } else {
            ctx.response.status = 404;
            ctx.response.body = { message: "Livre non trouvé" };
        }
    }

    static async createBook(ctx: RouterContext<"/books">) {
        try {
        const body = await ctx.request.body.json();
        const book: Book = body;

        const newBook = bookService.createBook(book);
        ctx.response.status = 201;
        ctx.response.body = newBook;
        }catch (erreur) {
            ctx.response.status = 400;
            ctx.response.body =  { message: "Erreur de création ", erreur: erreur };
        }
    }

    static async updateBook(ctx: RouterContext<"/books/:id", { id: string }>) {
        const id = ctx.params.id ? parseInt(ctx.params.id) : NaN;
        const body = await ctx.request.body.json();
        const updatedData = await body;

        const updatedBook = bookService.updateBook(id, updatedData);
        if (updatedBook) {
            ctx.response.body = updatedBook;
        } else {
            ctx.response.status = 404;
            ctx.response.body = { message: "Livre non trouvé" };
        }
    }

    static async deleteBook(ctx: RouterContext<"/books/:id", { id: string }>) {
        const id = ctx.params.id ? parseInt(ctx.params.id) : NaN;
        const deleted = bookService.deleteBook(id);

        if (deleted) {
            ctx.response.status = 200;
            ctx.response.body = { message: "Livre supprimé avec succès" };
        } else {
            ctx.response.status = 404;
            ctx.response.body = { message: "Livre non trouvé" };
        }
    }
}
