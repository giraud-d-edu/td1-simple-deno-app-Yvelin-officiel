import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/book.routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("🚀 Serveur Deno démarré sur http://localhost:8000");
await app.listen({ port: 8000 });
