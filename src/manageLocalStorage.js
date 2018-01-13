let isStorageAvailable = () => {
	if (typeof(Storage) !== "undefined") {
		return true;
	} else {
    return false;
	}
}

var setStorage = (item_name, item) => {
	localStorage.setItem(item_name, JSON.stringify(item));
}

var getStorage = (item_name) => {
	return JSON.parse(localStorage.getItem(item_name));
}

var storageLength = () => localStorage.length

export {setStorage, getStorage, storageLength};