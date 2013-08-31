'use script';

var mazeApp = angular.module('mazeApp', []);


/* --- Cell Constructors --- */

var MazeCellType = {
	HIDDEN: 0,
	PATH: 1,
	WALL: 2,
	START: 3,
	END: 4,
	SEARCHED: 5,
	SEARCHED_POPPED: 6,
	SOLUTION: 7
};

var MazeCell = function(row, column, type) {
	this.row = row;
	this.column = column;
	this.type = type;
};

mazeApp.factory('MazeService', function(){
	var MazeService = {
		cells: [], // cells stored by rows: ex: [1: [cell, cell, cell, ...]]
		rowCount: 7,
		columnCount: 7,

		resize: function(rows, columns) {
			console.log('resize: ', rows, columns);

			this.rowCount = rows || this.rowCount;
			this.columnCount = columns || this.columnCount;

			this.cells = [];

			for(var r = 1; r <= this.rowCount; r++) {
				if(typeof this.cells[r] == 'undefined')
					this.cells[r] = {};

				for(var c = 1; c <= this.columnCount; c++) {
					if(typeof this.cells[r][c] == 'undefined')
						this.cells[r][c] = new MazeCell(r, c, (Math.floor(Math.random() * 2) + 1));
				}
			}

			console.log('cells: ', this.cells);
		}
	};

	MazeService.resize(); // init cells
	return MazeService;
});

mazeApp.controller('MazeCtrl', function($scope, MazeService) {
	$scope.rows = MazeService.rowCount;
	$scope.columns = MazeService.columnCount;
	$scope.cells = MazeService.cells; //getCells();

	// $scope.$on('mazeUpdate', function(){
	// 	$scope.cells = MazeService.getCells();
	// });
});

mazeApp.controller('MazeMenuCtrl', function($scope, MazeService) {
	$scope.rows = MazeService.rowCount;
	$scope.columns = MazeService.columnCount;

	$scope.resizeMaze = function() {
		console.log('resize - rows: ' + $scope.rows + ' columns: ' + $scope.columns);
		MazeService.resize($scope.rows, $scope.columns);
		// console.log('resizeMaze - ', $scope.data);
		// console.log('mazeService - ', MazeService);
	};
});

// mazeApp.directive('maze', function(){
// 	return {
// 		restrict: 'E',
// 		controller: function() {
// 			this.logMessage = function(msg) {
// 				console.log('Maze Log: ' + msg);
// 			}
// 		}
// 	}
// });

// mazeApp.directive('cell', function(){
// 	return {
// 		restrict: 'E',
// 		require: '^maze',
// 		link: function(scope, element, attrs, MazeCtrl) {
// 			MazeCtrl.logMessage('cell here')
// 		}
// 	}
// })

