import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from "url";
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Optionally: explicitly handle "/" if you want to force index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.en.html'));
});

app.get('/es', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.es.html'));
});

console.log("App listening on port " + port);
app.listen(port);
