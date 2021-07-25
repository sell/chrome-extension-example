document.addEventListener('DOMContentLoaded', () => {
	const backgroundImage = document.querySelector('#bodyImage');
	const backgroundColor = document.querySelector('#bodyColor');
	const textColor = document.querySelector('#textColor');
	const customFont = document.querySelector('#customFont');

	// listening for when submit button is clicked
	document.querySelector('#submit').addEventListener('click', () => {
		// getting the current window
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				backgroundImage: backgroundImage.value,
				backgroundColor: backgroundColor.value,
				textColor: textColor.value,
				customFont: customFont.value,
			});
		});
		// .sync vs .local
		// we are using .sync here to sync for all chrome users
		chrome.storage.sync.set({
			backgroundImage: backgroundImage.value,
			backgroundColor: backgroundColor.value,
			textColor: textColor.value,
			customFont: customFont.value
		}, () => {
			console.log('Value is set to ' + backgroundImage.value);
		});
	});
	document.querySelector('#revert').addEventListener('click', () => {
		// setting everything no null, to revert to default settings.
		chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {
				backgroundImage: null,
				backgroundColor: null,
				textColor: null,
				customFont: null,
			});
		});
		chrome.storage.sync.set({
			backgroundImage: null,
			backgroundColor: null,
			textColor: null,
			customFont: null
		}, () => {
			console.log('Value is set to ' + backgroundImage.value);
		});
	});
});
