function turn(side, dir) {
	dir = dir || 1;
	let edgePieces = document.querySelectorAll('.e-' + side);
	let facePieces = document.querySelectorAll('.f-' + side);

	for (let i = 0; i < edgePieces.length; i++) {
		let regexp = new RegExp('\\se-[^' + side + ']', 'g');

		let oldEdge = parseInt(edgePieces[i].className[edgePieces[i].className.search(regexp) + 3]);
		let oldFace = parseInt(edgePieces[i].className[edgePieces[i].className.indexOf(' f-') + 3]);

		let newEdge = (oldEdge + (2*side + oldEdge)%3 + (side + 0.5 - dir/2)%2*3 - 1)%6 + 1;
		let newFace = (oldFace + (2*side + oldFace)%3 + (side + 0.5 - dir/2)%2*3 - 1) % 6 + 1;

		edgePieces[i].className = edgePieces[i].className.replace(/\sf-./, ' f-' + newFace);
		edgePieces[i].className = edgePieces[i].className.replace(regexp, ' e-' + newEdge);
	}

	for (let i = 0; i < facePieces.length; i++) {
		facePieces[i].className = facePieces[i].className.replace(
			/\se-./g,
			function(match) {
				let oldEdge = parseInt(match[3]);

				newEdge = (oldEdge + (2*side + oldEdge)%3 + (side + 0.5 - dir/2)%2*3 - 1)%6 + 1;

				return ' e-' + newEdge;
			}
		);
	}
}

let cubeSide = 1;
let dir = 1;
let i = 1;

window.setInterval(
	function() {
		turn(cubeSide, dir);

		cubeSide += i;

		if (cubeSide === 6 || cubeSide === 1) {
			i += -(cubeSide - 3) / Math.abs(cubeSide - 3);
			dir *= i || 1;
		}
	},
	2000
);