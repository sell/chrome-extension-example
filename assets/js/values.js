// in this file we are setting the default values if the user added some
document.addEventListener('DOMContentLoaded', () => {
	const backgroundImage = document.querySelector('#bodyImage');
	const backgroundColor = document.querySelector('#bodyColor');
	const textColor = document.querySelector('#textColor');
	const customFont = document.querySelector('#customFont');

	chrome.storage.sync.get(['backgroundImage', 'backgroundColor', 'textColor', 'customFont'], function(result) {
		backgroundImage.value = result.backgroundImage || '';
		backgroundColor.value = result.backgroundColor || '#000000';
		textColor.value = result.textColor || '#000000';
		customFont.value = result.customFont || '';
	});
});
