(function() {
	let h1 = document.querySelector("#colorgame h1");
	let btns = document.querySelectorAll("#colorgame .mode");
	let colors = [];
	let message = document.querySelector("#colorgame #message");
	let pickedColor = [];
	let resetButton = document.querySelector("#colorgame #reset");
	let rgbDisplay = document.querySelector("#colorgame #rgbDisplay");
	let squares = document.querySelectorAll("#colorgame .square");

	init();

	function init(){
		// btns event listeners
		for(let i=0; i< btns.length; i++){
			btns[i].addEventListener("click", function(){
				if(!this.classList.contains("selected")){
					reset(3*i+3);
					for(let j=0; j<btns.length; j++){
						btns[j].classList.toggle("selected");
					};
					toggleSquares([false, true][i]);
				}
			});
		}

		for(let i=0; i<6; i++) {
			squares[i].addEventListener("click", function(){
				if(this.style.backgroundColor === pickedColor) {
					message.textContent = "Correct!";
					h1.style.backgroundColor = pickedColor;
					changeColors(pickedColor);
					resetButton.textContent = "Play Again?";
				} else {
					this.style.backgroundColor = "#232323";
					message.textContent = "Try Again";
				}
			});
		}

		resetButton.addEventListener("click", function(){
		btns[0].classList.contains("selected") ? reset(3) : reset(6);
	});

		reset(6);
	}

	function reset(num){
		colors = generateColors(num);
		pickedColor = colors[Math.floor(Math.random()*num)];
		rgbDisplay.textContent = pickedColor;
		showRandomColors();
		message.textContent = "";
		h1.style.backgroundColor = "steelblue";
		resetButton.textContent = "New Colors";
	}

	function toggleSquares(val){
		for(let i=3; i<6; i++){
			val ?	squares[i].classList.remove("hide") : squares[i].classList.add("hide");
		}
	}

	function generateColors(num) {
		let arr = [];
		for(let i=0; i<num; i++){
			arr[i] = "rgb("
			for(let j=0; j<3; j++) {
				arr[i] += Math.floor(Math.random()*256);
				if(j<2) {arr[i] += ", ";}
			}
			arr[i] += ")"
		}
		return arr;
	}

	function showRandomColors(){
		for(let i=0; i<colors.length; i++){
			squares[i].style.backgroundColor = colors[i];
		}
	}

	function changeColors(color) {
		for(let i=0; i<squares.length; i++) {
			squares[i].style.backgroundColor = color;
		}
	}
})()