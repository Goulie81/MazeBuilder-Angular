'use strict';

// Data Models

var Maze = function(opts) {

	// private variables
	var MAX_ROWS = 15,
		MIN_ROWS = 4,
		MAX_COLUMNS = MAX_ROWS,
		MIN_COLUMNS = MIN_ROWS,
		startCellSet = false,
		finishCellSet = false;
		// listeners = {};


	// public variables
	this.cells = (opts.cells) || []; // cells stored by rows: ex: [1: [cell, cell, cell, ...]]
	this.rows = (opts.rows) || 7;
	this.columns = (opts.columns) || 7;
	this.animationDuration = (opts.animationDuration) || 600;


	// public functions
	this.addColumn = function() {
		console.log('addColumn');
		if(this.columns < MAX_COLUMNS) {
			this.columns += 1;
			this.resize();
			// this.dispatch('maze:addColumn');
		}
	};

	this.removeColumn = function() {
		console.log('removeColumn');
		if(this.columns > MIN_COLUMNS) {
			this.columns -= 1;
			this.resize();
			// this.dispatch('maze:removeColumn');
		}
	};

	this.addRow = function() {
		console.log('addRow');
		if(this.rows < MAX_ROWS) {
			this.rows += 1;
			this.resize();
			// this.dispatch('maze:addRow');
		}
	};

	this.removeRow = function() {
		console.log('removeRow');
		if(this.rows > MIN_ROWS) {
			this.rows -= 1;
			this.resize();
			// this.dispatch('maze:removeRow');
		}
	};

	this.cellAt = function(row, column) {
		if(typeof this.cells[row][column] !== 'undefined') {
			return this.cells[row][column];
		}
	};

	this.setStart = function(row, column) {
		var cell = this.cellAt(row, column);

		if(cell) {
			cell.type = MazeCellType.START;
			this.startCellSet = true;
		}
	};

	this.setFinish = function(row, column) {
		var cell = this.cellAt(row, column);

		if(cell) {
			cell.type = MazeCellType.FINISH;
			this.finishCellSet = true;
		}
	};

	this.startSet = function() {
		return startCellSet;
	};

	this.finishSet = function() {
		return finishCellSet;
	};

	this.solve = function(animate) {
		var animated = animate || false;

		if(animated) {
			console.log('animate');
		}
	};

	this.resize = function() {
		console.log('resize: ', this.rows, this.columns);

		// console.log('typeof cells: ', typeof this.cells);
		// if(typeof this.cells == )
		// this.cells = [];

		var _cells = [];

		for(var r = 1; r <= this.rows; r++) {
			if(typeof this.cells[r] === 'undefined') {
				this.cells[r] = {};
			}

			_cells[r] = {};

			for(var c = 1; c <= this.columns; c++) {
				// console.log('cell: ', this.cells[r][c]);
				// console.log('cell type: ', typeof this.cells[r][c]);
				//var cell = this.cellAt(r, c);

				if(typeof this.cells[r][c] === 'undefined'){
					_cells[r][c] = new MazeCell(r, c, MazeCellType.PATH); // (Math.floor(Math.random() * 2) + 1));
				}
				else{
					_cells[r][c] = new MazeCell(r, c, this.cells[r][c].type);
				}
			}
		}

		this.cells = _cells;
	};


	// init this object after properties and functions are set
	this.resize();
};

var MazeCell = function(row, column, type) {
	this.row = row;
	this.column = column;
	this.type = type;
};

var MazeCellType = {
	PATH: 1,
	WALL: 2,
	START: 3,
	FINISH: 4,
	SEARCHED: 5,
	SEARCHED_POPPED: 6,
	SOLUTION: 7
};