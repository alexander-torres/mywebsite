function init() {
	// let frame = document.querySelector('#frame');
	// let spaLinks = [
	// 	'/projects/colorgame',
	// 	'/projects/sokoban',
	// 	'/projects/tictactoe'
	// ];

	// Space(spaLinks, frame);
	projectOpen();

	decorateLinks();
}

function Space(linksArray, htmlContainer) {
	let aTag;
	let htmlData;
	if (!htmlContainer) {
		htmlContainer = document.body;
	}

	for (let i = 0; i < linksArray.length; i++) {
		aTag = document.querySelector('a[href="' + linksArray[i] + '"]');

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

function projectOpen() {
	let linksArray = document.querySelectorAll('.nav-projects li');
	let projectsArray = document.querySelectorAll('.project');
	let stage = document.querySelector('#projects .stage');

	for (let i = 0; i < linksArray.length; i++) {
		let link = linksArray[i];

		link.addEventListener(
			'click',
			function(e) {
				e.preventDefault();
				let project = document.querySelector('#' + this.className).parentNode;
				let visibleProject = document.querySelector('#projects .stage .visible');

				if (visibleProject) {
					visibleProject.classList.remove('visible');
				}

				project.classList.add('visible');
				stage.classList.add('visible');

				setTimeout(
					function() {
						document.body.style.overflow = 'hidden';
					},
					300
				);
			}
		);
	}
}

function projectClose() {
	let stage = document.querySelector('#projects .stage');
	let visibleProject = document.querySelector('#projects .stage .visible');

	stage.classList.remove('visible');
	document.body.style.overflow = '';

	setTimeout(
		function() {
			visibleProject.classList.remove('visible');
		},
		300
	);
}

function decorateLinks() {
	let linksArray = document.querySelectorAll('.nav-projects li');

	for (let i=0; i < linksArray.length; i++) {
		let url = linksArray[i].className;
		let span = linksArray[i].querySelector('span');

		span.style.backgroundImage = 'url(/images/' + url + '.jpg)';
	}
}

init();