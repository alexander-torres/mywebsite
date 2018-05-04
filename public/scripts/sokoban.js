(function() {
	let directions = [[-1, 0],[ 0, 1],[ 1, 0],[ 0,-1]];
	let level = {
		gameOn: true,
		boulders: 10,
		score: 0,
		field: ["######  ##### ",
				"#    #  #   # ",
				"# O  #### O # ",
				"# O @    O  # ",
				"#  #######O # ",
				"####   ### ###",
				"       #     #",
				"       #O    #",
				"       # O   #",
				"      ## O   #",
				"      #*O O  #",
				"      ########"]
			};
	let screen = document.querySelector('#screen');

	window.onkeydown = function(e) {
		e.preventDefault();

		if (level.gameOn === false) return;

		let key = e.key;

		if (key === "ArrowUp" || key === "ArrowDown" || key === "ArrowRight" || key === "ArrowLeft" ) {
			move(key.slice(5,6));
			printField();
		}
	};

	function addArrays(array1, array2) {
		let result = [];

	    if (array1.length !== array2.length)
	    	throw new Error('Arrays are not of same length');

	    for (let i = 0; i < array1.length; i++)
	        result.push(array1[i] + array2[i]);

	    return result;
	}

	function searchField(func) {
		let result;

		for(let row = 0; row < level.field.length; row++) {
			for (let col = 0; col < level.field[0].length; col++)
				result = func(row, col) || result;
		}

		return result;
	}

	function parseObject(char) {
		let objects = ['Wall', 'Empty', 'Boulder', 'Player', 'Exit'],
			chars = '# O@*';

		return objects[chars.indexOf(char)];
	}

	function printField() {
		while (screen.firstChild){
			screen.removeChild(screen.firstChild);
		}

		searchField(
			function(row, col) {
				let lineBrake,
					img = document.createElement('img');

				img.src = '/images/' + parseObject(level.field[row][col]) + '.jpg';

				screen.appendChild(img);

				if (row < level.field.length - 1 && col === level.field[0].length - 1) {
					lineBrake = document.createElement('br');
					screen.appendChild(lineBrake);
				}
			}
		);
	}

	function findPlayer() {
		return searchField(
			function(row, col) {
				if (level.field[row][col] === '@') {
					return [row, col];
				}
			}
		);
	}

	function getSurroundings(position) {
		let row, col, objects = [];

		for (let i = 0; i < directions.length; i++){
			col = position[1] + directions[i][1];
			row = position[0] + directions[i][0];

			objects.push(parseObject(level.field[row][col]));
		}

		return objects;
	}

	function move(dirChar) {
		let dirNum = 'URDL'.indexOf(dirChar),
			position = findPlayer(),
			surroundings = getSurroundings(position);

		if (surroundings[dirNum] === 'Empty') {
			updatePosition(position, directions[dirNum], '@');
		} else if (surroundings[dirNum] === 'Boulder') {
			position = addArrays(position, directions[dirNum]);
			surroundings = getSurroundings(position);
			if (surroundings[dirNum] === 'Empty') {
				updatePosition(position, directions[dirNum], 'O');
				updatePosition(findPlayer(), directions[dirNum], '@');
			} else if (surroundings[dirNum] === 'Exit') {
				removeObject(position);
				updatePosition(findPlayer(), directions[dirNum], '@');
				level.score++;
			}
		} else if (surroundings[dirNum] === 'Exit') {
			removeObject(position);
			endGame();
		}
	}

	function updatePosition(position, direction, char) {
		removeObject(position);
		let next = addArrays(position, direction),
			text = level.field[next[0]];
		level.field[next[0]] = text.substr(0, next[1]) + char + text.slice(next[1] + 1);
	}

	function removeObject(position) {
		let text = level.field[position[0]];
		level.field[position[0]] = text.substr(0, position[1]) + ' ' + text.slice(position[1] + 1);
	}

	function endGame() {
		level.gameOn = false;
		let message = document.createElement('h1');
		// document.body.appendChild(message);
		if (level.score === level.boulders)
			message.innerText = 'Perfect Score! ' + level.score + '/' + level.score;
		else
			message.innerText = 'You missed ' + (level.boulders - level.score) + ' boulders.';
		console.log(message.innerText);
	}

	printField();
})();