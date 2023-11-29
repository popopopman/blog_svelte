<script lang="ts" type="module" src="./index.js">
    import { fade } from 'svelte/transition';

    type TodoItem = {
        id: number;
        title: string;
    };
    let title = '';
    let todoList: TodoItem[] = [];

    // リスト追加
    const handleClickCreateButton = () => {
        if (title.trim() !== '') {
            const id = new Date().getTime();
            todoList = [...todoList, { id, title }]; // 初期状態は未完了
            title = '';
        }
    };

    // 削除処理
    const handleClickDeleteButton = (index) => {
        todoList = todoList.filter((_, i) => i !== index);
    };
</script>

<div class="container mt-5">
    <div class="row">
        <div class="col-md-6 mx-auto">
            <div class="mb-3">
                <label for="title" class="form-label">ToDoリスト</label>
                <div class="input-group">
                    <input type="text" class="form-control" id="title" bind:value={title}>
                    <button class="btn btn-primary" on:click={handleClickCreateButton}>作成</button>
                </div>
            </div>

            {#if todoList.length === 0}
            <div class="alert alert-info">アイテムを作成してください</div>
            {:else}
            <ul class="list-group">
                {#each todoList as todoItem, index (todoItem.id)}
                <li transition:fade class="list-group-item d-flex justify-content-between align-items-center">
                    <div class="form-check form-switch">
                        <label class="form-check-label" for={`todo-${todoItem.id}`}>{todoItem.title}</label>
                    </div>
                    <button class="btn btn-danger" on:click={() => handleClickDeleteButton(index)}>
                        <i class="bi bi-trash"></i>
                    </button>                    
                </li>
                {/each}
            </ul>
            {/if}
        </div>
    </div>
</div>
