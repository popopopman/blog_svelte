<script lang="ts">
	let title = '';
	let todoList = [];

	// ファイルからtodoリストを読み込む関数
	async function loadTodoList() {
	const response = await fetch('/data/todolist.json');
	const data = await response.json();
	todoList = data.todoList;
	}

	// コンポーネントの初期化時に読み込み
	loadTodoList();

	// ファイルにtodoリストを保存する関数
	async function saveTodoList() {
	await fetch('/data/todolist.json', {
		method: 'POST', // サーバーサイドで処理するためのエンドポイント
		headers: {
		'Content-Type': 'application/json'
		},
		body: JSON.stringify({ todoList })
	});
	}

	// 作成ボタンを押したときの処理
	const handleClickCreateButton = () => {
		if (title.trim() !== '') {
			todoList = [...todoList, title];
			title = '';
		}
		saveTodoList();
	};

	// 削除ボタンを押したときの処理
	const handleClickDeleteButton = (index) => {
		todoList = todoList.filter((_, i) => i !== index);
		saveTodoList();
	};

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
		{#each todoList as todoItem,index (index)}
		<li>{todoItem} <button on:click={()=>{handleClickDeleteButton(index)}}>削除</button></li>
		{/each}
	</ul>
	{/if}