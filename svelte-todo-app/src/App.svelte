<script lang="ts">
    let title = '';
    let todoList = [];

    // APIのベースURL（サーバーのURL）
    const API_BASE_URL = 'http://localhost:3000';

    // サーバーからTodoリストを読み込む関数
    async function loadTodoList() {
        const response = await fetch(`${API_BASE_URL}/todolist`);
        todoList = await response.json();
    }

    // コンポーネントの初期化時にTodoリストを読み込み
    loadTodoList();

    // サーバーにTodoリストを保存する関数
    async function saveTodoList() {
        await fetch(`${API_BASE_URL}/todolist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todoList)
        });
    }

    // 作成ボタンを押したときの処理
    function handleClickCreateButton() {
        if (title.trim() !== '') {
            const newTodo = { id: Date.now(), title: title };
            todoList = [...todoList, newTodo];
            title = '';
            saveTodoList();
        }
    }

    // 削除ボタンを押したときの処理
    function handleClickDeleteButton(id) {
        todoList = todoList.filter(todo => todo.id !== id);
        saveTodoList();
    }
</script>

<div>
    <label>
        タイトル
        <input bind:value={title} />
    </label>
    <button on:click={handleClickCreateButton}>作成</button>
</div>

{#if todoList.length === 0}
    <div>アイテムを作成してください</div>
{:else}
    <ul>
        {#each todoList as todoItem (todoItem.id)}
            <li>{todoItem.title} <button on:click={() => handleClickDeleteButton(todoItem.id)}>削除</button></li>
        {/each}
    </ul>
{/if}
