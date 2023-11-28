<script lang="ts" type="module" src="./index.js">
	let title = '';
	let todoList = [];

	// 作成ボタンを押したときの処理
	const handleClickCreateButton = () => {
		if (title.trim() !== '') {
			todoList = [...todoList, title];
			title = '';
		}
	};

	// 削除ボタンを押したときの処理
	const handleClickDeleteButton = (index) => {
		todoList = todoList.filter((_, i) => i !== index);
	};

</script>
<style>
    .mdc-button {
        background-color: var(--primary-color);
        color: var(--secondary-color);
    }

    .mdc-text-field--filled .mdc-floating-label {
        color: var(--primary-color);
    }

    .mdc-text-field--filled .mdc-line-ripple {
        background-color: var(--primary-color);
    }
</style>
	
<div>
    <label class="mdc-text-field mdc-text-field--filled">
        <span class="mdc-text-field__ripple"></span>
        <input class="mdc-text-field__input" type="text" bind:value={title} />
        <span class="mdc-floating-label">タイトル</span>
        <span class="mdc-line-ripple"></span>
    </label>
    <button class="mdc-button mdc-button--raised" on:click={handleClickCreateButton}>作成</button>
</div>

{#if todoList.length === 0}
<div>アイテムを作成してください</div>
{:else}
<ul class="mdc-list">
    {#each todoList as todoItem, index (index)}
    <li class="mdc-list-item">
        {todoItem}
        <button class="mdc-icon-button material-icons" on:click={()=>{handleClickDeleteButton(index)}}>削除</button>
    </li>
    {/each}
</ul>
{/if}