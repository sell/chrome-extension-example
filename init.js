(() => {
	chrome.storage.sync.get(['backgroundImage'], function(result) {
		document.body.style.backgroundImage = `url("${result.backgroundImage}")`;
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundPosition = 'center center';
	});
	chrome.storage.sync.get(['backgroundColor'], function(result) {
		[...document.getElementsByTagName('*')].forEach((e) => e.style.backgroundColor = result.backgroundColor);
		chromeCss();
	});
	chrome.storage.sync.get(['textColor', 'customFont'], function(result) {
		document.body.style.color = `${result.textColor} !important`;
		changeColor(result.textColor);
		changeFont(result.customFont);
	});
})();

chrome.runtime.onMessage.addListener((request) => {
	document.body.style.backgroundImage = `url("${request.backgroundImage}")`;
	[...document.getElementsByTagName('*')].forEach((e) => e.style.backgroundColor = request.backgroundColor);
	chromeCss();
	changeFont(request.customFont);
	changeColor(request.textColor);
});

function changeColor(color) {
	document.body.style.color = color;
	[...document.getElementsByTagName('*')].forEach((e) => e.style.color = color);
}

function chromeCss() {
	[...document.getElementsByTagName('div')].forEach((e) => e.style.backgroundColor = 'transparent');
}

function changeFont(customFont) {
	const url = customFont;

	if (url && url.split('?').length === 2) {
		const params = new URLSearchParams(url.split('?')[1]);
		const font = params.get('family');
		const removeWeight = font.split(':')[0];

		const newStyle = document.createElement('style');
		newStyle.appendChild(document.createTextNode(`
        @import url('${url}');
         `));

		document.head.appendChild(newStyle);

		[...document.getElementsByTagName('*')].forEach((e) => e.style.fontFamily = removeWeight || 'initial');
	}
}
