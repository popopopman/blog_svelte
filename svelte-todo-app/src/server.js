// server.js

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// JSONファイルのパス
const TODOLIST_PATH = path.join(__dirname, 'todolist.json');

app.use(bodyParser.json());

// Todoリストを取得する
app.get('/todolist', (req, res) => {
    if (fs.existsSync(TODOLIST_PATH)) {
        const data = fs.readFileSync(TODOLIST_PATH, 'utf8');
        res.json(JSON.parse(data));
    } else {
        res.json([]); // ファイルが存在しない場合は空のリストを返す
    }
});

// Todoリストを保存する
app.post('/todolist', (req, res) => {
    const todoList = req.body;
    fs.writeFileSync(TODOLIST_PATH, JSON.stringify(todoList, null, 2));
    res.status(200).send('Todoリストが保存されました');
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で起動しています`);
});
