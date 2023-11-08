<script lang="ts">
	let title = '';
	let todoList: string[] = ['やること１', 'やること２', 'やること３'];
  
	// 作成ボタンを押したときの処理
	const handleClickCreateButton = () => {
	  alert(title);
	  title = '';
	};
	</script>
	
	<div>
		<form>
		<label>
			タイトル
			<input bind:value={title} />
		</label>
		<button on:click={handleClickCreateButton}>作成</button>
		</form>
	</div>
  
	{#if todoList.length === 0}
	<div>アイテムを作成してください</div>
	{:else}
	<ul>
		{#each todoList as todoItem}
		<li>{todoItem}</li>
		{/each}
	</ul>
	{/if}
