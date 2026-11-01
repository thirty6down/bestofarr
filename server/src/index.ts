import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT ?? 3000);
const here = path.dirname(fileURLToPath(import.meta.url));
const webDist = process.env.WEB_DIST ?? path.resolve(here, "../../web/dist");

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(express.static(webDist));
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(webDist, "index.html"));
});

app.listen(port, () => {
  console.log(`Bestofarr listening on :${port}`);
});
