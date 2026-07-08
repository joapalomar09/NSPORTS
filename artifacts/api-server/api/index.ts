// Vercel serverless entrypoint.
//
// Vercel's Node.js runtime treats any file under /api as an individual
// serverless function and calls its default export as an (req, res)
// request handler on every invocation — it never runs `src/index.ts`
// (which calls `app.listen()` and is only used for the persistent-server
// deployment model on Replit). Express apps satisfy that same (req, res)
// signature, so we can export the app directly with no adapter needed.
import app from "../src/app";

export default app;
