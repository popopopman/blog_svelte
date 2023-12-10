type Item = {
    id: number;
    title: string;
}; 

export const createItem = (title: string, list: Item[]): Item[] => {
    if (title.trim() !== '') {
        const id = new Date().getTime();
        return [...list, { id, title }];
    }
    return list;
};

export const deleteItem = (id: number, list: Item[]): Item[] => {
    return list.filter(item => item.id !== id);
};

export function updateList(event, sourceList) {
    // ドラッグアンドドロップイベントから新しい順序のアイテムリストを取得
    const updatedItems = event.detail.items;

    // 新しい順序でリストを更新
    const updatedList = updatedItems.map(item => {
        // ここでは、idを使って元のリストから対応するアイテムを探します
        return sourceList.find(sourceItem => sourceItem.id === item.id);
    });

    // 更新されたリストを返す
    return updatedList;
}