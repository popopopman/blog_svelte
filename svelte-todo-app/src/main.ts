//import App from './App.svelte';

// const app = new App({
// 	target: document.body,
// });

// export default app;

// src/todolist.ts

import cors from 'cors';
import express from 'express';
// 他のインポート...

const app = express();
app.use(cors()); // CORSミドルウェアを追加

type TodoItem = {
    id: number;
    title: string;
};

let todoList: TodoItem[] = [];

// APIのベースURL（Node.jsサーバーのURL）
const API_BASE_URL = 'http://localhost:3000';

// Todoリストをサーバーから取得する
export async function loadTodoList(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/todolist`);
    todoList = await response.json();
}

// Todoアイテムを追加してサーバーに保存する
export async function addTodo(title: string): Promise<void> {
    const newTodo: TodoItem = {
        id: Date.now(),
        title: title
    };
    todoList = [...todoList, newTodo];
    await fetch(`${API_BASE_URL}/todolist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoList)
    });
}

// Todoアイテムを削除してサーバーを更新する
export async function deleteTodo(id: number): Promise<void> {
    todoList = todoList.filter(todo => todo.id !== id);
    await fetch(`${API_BASE_URL}/todolist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoList)
    });
}

// Todoリストを取得する
export function getTodoList(): TodoItem[] {
    return todoList;
}