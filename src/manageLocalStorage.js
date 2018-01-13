let isStorageAvailable = () => {
	if (typeof(Storage) !== "undefined") {
		return true;
	} else {
    return false;
	}
}

var setStorage = (item_name, item) => {
	if (isStorageAvailable() === true) {
		localStorage.setItem(item_name, JSON.stringify(item));
	}
}

var getStorage = (item_name) => {
	if (isStorageAvailable() === true) {
		return JSON.parse(localStorage.getItem(item_name));
	}
}

var storageLength = () => {
	if (isStorageAvailable() === true) {
		return localStorage.length;
	}
}

export {setStorage, getStorage, storageLength};