import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { BookController } from "../controllers/book.controller.ts";

const router = new Router();

router.get("/books", BookController.getBooks);
router.get("/books/:id", BookController.getBookById);
router.post("/books", BookController.createBook);
router.put("/books/:id", BookController.updateBook);
router.delete("/books/:id", BookController.deleteBook);

export default router;
