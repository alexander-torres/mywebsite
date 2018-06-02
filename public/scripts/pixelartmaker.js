(function() {
  const $grid = $('#grid');
	const $gridHeight = $('#grid-height');
	const $gridWidth = $('#grid-width');
	const $color = $('#color');
	let dragging = false;
	
	/*
	Set ratio between table height and width so that cells
	stay square shaped when the window is resized to mobile
	dimensions.
	*/
	function resizeGrid(rows, columns) {
		let ratio = rows / columns;
		let maxHeight = Math.round(500 * ratio) + 'px';
		let height = Math.round(100 * ratio) + 'vw';
		
		$grid.css({'max-height': maxHeight, 'height': height});
	}
	
	function addElements(parentObj, childString, number) {
		for (let i = 0; i < number; i++) {
			parentObj.append('<' + childString + '></' + childString + '>');
		}
	}
  
  function makeGrid(gridRowCount, gridColumnCount) {
    gridRowCount = gridRowCount || $gridHeight.val();
    gridColumnCount = gridColumnCount || $gridWidth.val();
		let $gridFragment = $(document.createDocumentFragment());

    // Clear grid
    $('tr').remove();
    
		addElements($gridFragment, 'tr', gridRowCount);
		
		let $fragmentRows = $($gridFragment[0].querySelectorAll('tr'));
		
    $fragmentRows.each(function() {
			addElements($(this), 'td', gridColumnCount)
		});
		
		$grid.append($gridFragment);
		
		resizeGrid(gridRowCount, gridColumnCount);
	};
  
  makeGrid(20, 20);

	$('#pickSize').submit(
		function(e) {
			e.preventDefault();
			makeGrid();
		}
	);
	
	$grid.on(
		'click',
		'td',
		function() {
			$(this).css('background', $color.val());
		}
	);

	$grid.on(
		'mousedown',
		function(e) {
			dragging = true;
			e.preventDefault();
		}
	);
	
	$(document).on(
		'mouseup',
		function() {
			dragging = false;
		}
	);
	
	$grid.on(
		'mousedown mouseover',
		function(e) {
			if (dragging && e.target.nodeName == 'TD') {
				$(e.target).css('background', $color.val());
			}
		}
	);
})();