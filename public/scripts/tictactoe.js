let tds = document.querySelectorAll('#tictactoe td'),
  markers = document.querySelectorAll('#tictactoe .marker'),
  table = document.querySelector('#tictactoe table'),
  currentMarker = 'X';

// Add a click listener to each box in the board
for(let i = 0; i < tds.length; i++){
	tds[i].addEventListener('click', function(){
    if(!checkForWin() && !checkForCats() && this.innerText === ''){
      // Mark the box with the current marker (X or O) on click
      this.innerText = currentMarker;
      // Switch the current marker
      currentMarker = 'XO'.replace(currentMarker, '');
      // Select corresponding marker button
      selectMarker();
      checkForWin();
      checkForCats();
    }
	});
}

// Add click listeners for marker option buttons
for(let i = 0; i < markers.length; i++){
	markers[i].addEventListener('click', function(){
    // Set current marker
		currentMarker = this.innerText;
		selectMarker();
	});
}

// Add click listener for reset button
document.querySelector('#tictactoe #reset').addEventListener('click', function(){
  // Erase all X's and O's
	for(let i = 0; i < tds.length; i++)
		tds[i].innerText = '';
  // Reset all box colors to white
  newColor(tds, 'reset');
  // Reset Marker
	currentMarker = 'X';
	selectMarker();
  // Delete Cat
  table.classList.remove('cats');
});

function selectMarker(){
	markers[0].classList.remove('selected');
	markers[1].classList.remove('selected');
	markers['XO'.indexOf(currentMarker)].classList.add('selected');
}


// The following code is only for if you want to check for win conditions
// Make a way to pull specified elements from array
Object.prototype.pick = function(arr) {
	let newArray = [];
	for(let i = 0; i < arr.length; i++)
		newArray.push(this[arr[i]]);
	return newArray
}

// Check that all string characters from an array are the same
function sameChar(arr){
  let string = '';
  for(i = 0; i < arr.length; i++)
    string += arr[i].innerText;
	let str = new RegExp(string[0], 'g');
	if(string.length === 3 && !string.replace(str,''))
    return true
	return false
}

// Check all possible win conditions
function checkForWin(){
  let winCases = [[0,3,6],[1,4,7],[2,5,8],[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6]];
  for(let i = 0; i < winCases.length; i++){
    if(sameChar(tds.pick(winCases[i]))){
      // highlight boxes in win condition
      newColor(tds.pick(winCases[i]), 'win');
      return true
    }
  }
  return false
}

function newColor(arr, condition){
  if(condition === 'win'){
    for(let i = 0; i < arr.length; i++)
      arr[i].style.backgroundColor = 'green';
  } else if(condition === 'reset'){
    for(let i = 0; i < arr.length; i++)
      arr[i].style.backgroundColor = 'inherit';
  }
}

function checkForCats(){
  let str = '';
  for(let i = 0; i < tds.length; i++)
    str += tds[i].innerText;
  if(str.length === 9){
    catsDisplay();
    return true
  }
  return false
}

function catsDisplay(){
  table.classList.add('cats');
}