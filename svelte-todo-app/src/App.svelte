<script lang="ts">
	let title = '';
	let todoList: string[] = ['やること１', 'やること２', 'やること３'];
  
	// 作成ボタンを押したときの処理
	const handleClickCreateButton = () => {
		if (title.trim() !== '') {
			todoList = [...todoList, title];
			title = '';
		}
	};

	// 削除ボタンを押したときの処理
	const handleClickDeleteButton = (index) => {
		// todoList = todoList.filter((_, i) => i !== index);
		console.log(todoList);

	};
	
	<div>
		<label>
			タイトル
			<input bind:value={title} placeholder="新しいタスクを入力" />
		</label>
		<button on:click={handleClickCreateButton}>作成</button>
	</div>
  
	{#if todoList.length === 0}
	<div>アイテムを作成してください</div>
	{:else}
	<ul>
		{#each todoList as todoItem,index (index)}
		<li>{todoItem} <button on:click={()=>{handleClickDeleteButton(index)}}>削除</button></li>
		{/each}
	</ul>
	{/if}
