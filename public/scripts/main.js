function init() {
	let frame = document.querySelector('#frame');
	let spaLinks = [
		'/projects/colorgame',
		'/projects/sokoban',
		'/projects/tictactoe'
	];

	Space(spaLinks, frame);
}

function Space(linksArray, htmlContainer) {
	let aTag;
	let htmlData;
	if (!htmlContainer) {
		htmlContainer = document.body;
	}

	for (let i = 0; i < linksArray.length; i++) {
		aTag = document.querySelector(`a[href='${linksArray[i]}']`);

		// loadReq(linksArray[i]);

		aTag.onclick = function(e) {
			e.preventDefault();

			loadReq(linksArray[i]);
		};
	}

	function loadReq(url) {
		let xhr = new XMLHttpRequest();

		xhr.addEventListener('load', reqListener);
		xhr.open('GET', url, true);
		xhr.send();
	};

	function reqListener() {
		htmlData = this.responseText;
		htmlContainer.innerHTML = htmlData;
		reloadScripts();
	}

	function reloadScripts() {
		let scriptArray = htmlContainer.getElementsByTagName('script');

		for (let i = 0; i < scriptArray.length; i++) {
			let script = document.createElement('script');

			for (let j = 0; j < scriptArray[i].attributes.length; j++) {
				let attr = scriptArray[i].attributes[j];

				script[attr.name] = attr.value;
			}

			scriptArray[i].parentNode.replaceChild(script, scriptArray[i]);
		}
	}
}

init();