<script lang="ts" type="module" src="./index.js">
    import { slide } from 'svelte/transition';
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import { createItem, deleteItem, updateList } from './action';


    type Item = {
        id: number;
        title: string;
    };
    let title = '';
    let todoList: Item[] = [];
    let inProgressList: Item[] = [];
    let doneList: Item[] = [];

    const handleClickCreateButton = () => {
        todoList = createItem(title, todoList);
        title = '';
        console.log('Todo List:', todoList);
    };

    const handleClickDeleteButton = (index) => {
        todoList = deleteItem(index, todoList);
        console.log('Todo List:', todoList);
    };
</script>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-auto">
            <div class="input-group">
                <input type="text" class="form-control" id="title" bind:value={title}>
                <button class="btn btn-primary" on:click={handleClickCreateButton}>作成</button>
            </div>
        </div>
    </div> 
    <div class="row">
        <!-- ToDoリスト -->
        <div class="mx-auto col-4">
            <div class="mb-3">
                <label for="title" class="form-label">ToDo</label>
            </div>
            
            {#if todoList.length === 0}
            <div class="alert alert-info">No Item</div>
            {:else}
            <ul class="list-group">
                {#each todoList as todoItem, index (todoItem.id)}
                    <li transition:slide class="list-group-item d-flex justify-content-between align-items-center">
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
        <!-- In Progressリスト -->
        <!-- <div class="mx-auto col-4">
            <div class="mb-3">
                <label for="title" class="form-label">In Progress</label>
            </div>
            
            {#if inProgressList.length === 0}
            <div class="alert alert-info">No Item</div>
            {:else}
            <ul class="list-group">
                {#each inProgressList as inprogressItem, index (inprogressItem.id)}
                    <li transition:slide class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for={`todo-${inprogressItem.id}`}>{inprogressItem.title}</label>
                        </div>
                        <button class="btn btn-danger" on:click={() => handleClickDeleteButton(index)}>
                            <i class="bi bi-trash"></i>
                        </button>                    
                    </li>
                {/each}
            </ul>
            {/if}
        </div>-->
        <!-- Doneリスト -->
        <!--
        <div class="mx-auto col-4">
            <div class="mb-3">
                <label for="title" class="form-label">Done</label>
            </div>
            
            {#if doneList.length === 0}
            <div class="alert alert-info">No Item</div>
            {:else}
            <ul class="list-group">
                {#each doneList as doneItem, index (doneItem.id)}
                    <li transition:slide class="list-group-item d-flex justify-content-between align-items-center">
                        <div class="form-check form-switch">
                            <label class="form-check-label" for={`todo-${doneItem.id}`}>{doneItem.title}</label>
                        </div>
                        <button class="btn btn-danger" on:click={() => handleClickDeleteButton(index)}>
                            <i class="bi bi-trash"></i>
                        </button>                    
                    </li>
                {/each}
            </ul>
            {/if}
        </div> -->
    </div>
</div>