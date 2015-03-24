

$(document).ready(function(){
	var gridSize = 960; // size of the square height/width in pixels
	var defaultRowSize = 16; //default amount of boxes per row
	var actionType = '1'; //default action
	var generateRgbNumber = function(){
		//this function generates RGB string for the random coloring
		var ret = "rgb("
		for (i=0; i < 3; i++){
			var tempRgbNum = Math.floor(Math.random() * 256);
			ret = ret + tempRgbNum.toString();
			if (i<2){
				ret = ret + ","
			}
		}
		ret = ret + ")"
		return ret;
	}
	var createGrid = function(rowSize){
		//this function gets the amount of boxes required per row, clculates the size of each box and inserts it to the html
		var boxSize = Math.floor(gridSize/rowSize);//clculating box size - rounded down
		var boxesArray = [];
		var container = $('.container');
		
		container.text('');
		for (var i = 0; i < rowSize * rowSize; i++) {//this loop runs and creates the boxes array
			boxesArray[i] = "<div class ='box'></div>";
		};
		// the reason for appending this way: http://www.learningjquery.com/2009/03/43439-reasons-to-use-append-correctly
		container.append(boxesArray.join('')); //adding the boxes inside the 'container' class div
		var box = $('.box');
		//setting box sizes
		box.css({'width':boxSize.toString() + 'px','height':boxSize.toString() + 'px'});
		if (actionType == '1'){ // regular box color changing
			box.on('mouseenter',function(){
				$(this).css({'background-color':'#FFFF00'});
			});
		}
		else if (actionType == '2'){ // rnadom coloring
			box.on('mouseenter',function(){
				$(this).css({'background-color':generateRgbNumber()});
			});		
		}
		else if (actionType == '3'){ // changing boxes opacity
			box.on('mouseenter',function(){
				var currOpacity = $(this).css('opacity');
				if (currOpacity > 0){
					$(this).css({'opacity':(parseFloat(currOpacity) - 0.1).toString()});
				}
			})
		}
	}

	createGrid(defaultRowSize); //setting the first grid according to the defaulted 16 X 16 sketch pad
	$('button').on('click',function(){
		var newSize = prompt('Enter new grid size:',16);
		actionType = $(this).data('action-type');//getting the action type from the button in order to determine the required action
		createGrid(newSize);
	});
});