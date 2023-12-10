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
    // ドラッグされるアイテムのクローンを格納する変数
    let draggedItemClone = null;
    // ドラッグされたアイテムをグローバルスコープに定義
    let draggedItemFromList;
    let draggedItemId;

    // Svelteのリアクティビティを活用するために、更新されたリストを反映させる処理
    const reflectList = (beforeList, afterList) => {
        if (beforeList === todoList) {
        todoList = afterList;
        } else if (beforeList === inProgressList) {
        inProgressList = afterList;
        } else if (beforeList === doneList) {
        doneList = afterList;
        }
    }

    // 作成ボタンのハンドラ
    const handleClickCreateButton = () => {
        todoList = createItem(title, todoList);
        title = '';
    };

    // 削除ボタンのハンドラ
    const handleClickDeleteButton = (index, targetList) => {
        // アイテムの ID に基づいて削除
        const updatedList = deleteItem(index, targetList);
        reflectList(targetList, updatedList);
    };

    // アイテムを移動する
    const moveItem = (item, fromList, toList) => {
        if (fromList !== toList) {
            // アイテムを新しいリストに追加
            const addedList = createItem(item.title, toList);
            reflectList(toList, addedList);
            // アイテムを元のリストから削除
            const deletedList = deleteItem(item.id, fromList); 
            reflectList(fromList, deletedList);
        }
    };

    // moveボタンのハンドラ (例: ToDoからIn Progressへ)
    const handleMoveItem = (item, fromList, toList) => {
        // moveItem関数を呼び出し
        moveItem(item, fromList, toList);
    };

    // ドラッグ開始時の処理
    function handleDragStart(event, druglist) {
        // ドラッグされるアイテムのクローンを作成
        const item = event.currentTarget;
        item.classList.add('dragging');
        // ドラッグされたアイテムのリストを設定
        draggedItemFromList = druglist;
        // ドラッグされているアイテムのデータを取得
        draggedItemId = item.getAttribute('data-item-id');
    }
    
    // ドラッグアンドドロップ中の処理
    function handleDrag(event) {
        // ドラッグ中のアイテムをスタイルなどで変更することができます
    }

    // ドラッグ終了時の処理
    function handleDragEnd() {
        if (!draggedItemClone) return;
        
        // クローンを削除
        document.body.removeChild(draggedItemClone);
        draggedItemClone = null;
        // ドラッグされたアイテムのリストとIDをクリア
        draggedItemFromList = null;
    }

    function handleDragOver(event) {
        event.preventDefault(); // ドラッグオーバー時のデフォルトの挙動をキャンセル
    }

    function handleDrop(event, dropList) {
        event.preventDefault();
        // ドラッグされているアイテムを取得
        const draggedItem = draggedItemFromList.find(item => item.id === Number(draggedItemId));
        // アイテムを移動または挿入する処理を実装
        moveItem(draggedItem, draggedItemFromList, dropList);
    }
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
        <div class="mx-auto col-4 rounded bg-light">
            <div class="mb-3">
                <label for="title" class="form-label">ToDo</label>
            </div>

            {#if todoList.length === 0}
                    <div class="list-group-item d-flex justify-content-between align-items-center" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, todoList)}>No Item</div>
            {:else}
            <ul class="list-group"  on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, todoList)}>
                {#each todoList as todoItem, index (todoItem.id)}
                    <li transition:slide
                        class="list-group-item d-flex justify-content-between align-items-center"
                        draggable="true"
                        on:dragstart={(e) => handleDragStart(e, todoList)}
                        on:drag={handleDrag}
                        on:dragend={handleDragEnd}
                        data-item-id={todoItem.id}>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-arrow-left-right"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#" on:click|preventDefault={() => handleMoveItem(todoItem, todoList, inProgressList)}>In Progress</a></li>
                                <li><a class="dropdown-item" href="#" on:click|preventDefault={() => handleMoveItem(todoItem, todoList, doneList)}>Done</a></li>
                            </ul>
                        </div>    
                        <div class="form-check form-switch">
                            <label class="form-check-label" for={`todo-${todoItem.id}`}>{todoItem.title}</label>
                        </div>
                        <button class="btn btn-danger" on:click={() => handleClickDeleteButton(todoItem.id, todoList)}>
                            <i class="bi bi-trash"></i>
                        </button>
                    </li>
                {/each}
            </ul>
            {/if}
        </div>
        <!-- In Progressリスト -->
        <div class="mx-auto col-4 rounded bg-light">
            <div class="mb-3">
                <label for="title" class="form-label">In Progress</label>
            </div>
            
            {#if inProgressList.length === 0}
                <div class="list-group-item d-flex justify-content-between align-items-center" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e,  inProgressList)}>No Item</div>
            {:else}
            <ul class="list-group" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e,  inProgressList)}>
                {#each inProgressList as inprogressItem, index (inprogressItem.id)}
                    <li transition:slide
                        class="list-group-item d-flex justify-content-between align-items-center"
                        draggable="true"
                        on:dragstart={(e) => handleDragStart(e, inProgressList)}
                        on:drag={handleDrag}
                        on:dragend={handleDragEnd}
                        data-item-id={inprogressItem.id}>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-arrow-left-right"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#" on:click|preventDefault={() => handleMoveItem(inprogressItem, inProgressList, todoList)}>ToDo</a></li>
                                <li><a class="dropdown-item" href="#" on:click|preventDefault={() => handleMoveItem(inprogressItem, inProgressList, doneList)}>Done</a></li>
                            </ul>
                        </div> 
                        <div class="form-check form-switch">
                            <label class="form-check-label" for={`todo-${inprogressItem.id}`}>{inprogressItem.title}</label>
                        </div>
                        <button class="btn btn-danger" on:click={() => handleClickDeleteButton(inprogressItem.id, inProgressList)}>
                            <i class="bi bi-trash"></i>
                        </button>            
                    </li>
                {/each}
            </ul>
            {/if}
        </div>
        <!-- Doneリスト -->      
        <div class="mx-auto col-4 rounded bg-light">
            <div class="mb-3">
                <label for="title" class="form-label">Done</label>
            </div>
            
            {#if doneList.length === 0}
                <div class="list-group-item d-flex justify-content-between align-items-center" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, doneList)}>No Item</div>
            {:else}
            <ul class="list-group" on:dragover={handleDragOver} on:drop={(e) => handleDrop(e, doneList)}>
                {#each doneList as doneItem, index (doneItem.id)}
                    <li transition:slide
                        class="list-group-item d-flex justify-content-between align-items-center"
                        draggable="true"
                        on:dragstart={(e) => handleDragStart(e, doneList)}
                        on:drag={handleDrag}
                        on:dragend={handleDragEnd}
                        data-item-id={doneItem.id}>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="bi bi-arrow-left-right"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><a class="dropdown-item" href="#" on:click|preventDefault={() => handleMoveItem(doneItem, doneList, todoList)}>ToDo</a></li>
                                <li><a class="dropdown-item" href="#" on:click|preventDefault={() => handleMoveItem(doneItem, doneList, inProgressList)}>In Progress</a></li>
                            </ul>
                        </div> 
                        <div class="form-check form-switch">
                            <label class="form-check-label" for={`todo-${doneItem.id}`}>{doneItem.title}</label>
                        </div>
                        <button class="btn btn-danger" on:click={() => handleClickDeleteButton(doneItem.id, doneList)}>
                            <i class="bi bi-trash"></i>
                        </button>
                    </li>
                {/each}
            </ul>
            {/if}
        </div>
    </div>
</div>