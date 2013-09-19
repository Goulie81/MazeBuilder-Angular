'use strict';

var mazeApp = angular.module('mazeApp', ['dragAndDrop']);

mazeApp.factory('MazeService', function(){
	var currentMaze = new Maze({rows: 7, columns: 7, animationDuration: 600});

	//build service api
	return {
		rows: currentMaze.rows,
		columns: currentMaze.columns,
		cells: currentMaze.cells,
		animationDuration: currentMaze.animationDuration,
		addRow: function() {
			currentMaze.addRow();
			this.mazeChanged();
		},
		removeRow: function() {
			currentMaze.removeRow();
			this.mazeChanged();
		},
		addColumn: function() {
			currentMaze.addColumn();
			this.mazeChanged();
		},
		removeColumn: function() {
			currentMaze.removeColumn();
			this.mazeChanged();
		},
		mazeChanged: function() {
			this.rows = currentMaze.rows;
			this.columns = currentMaze.columns;
			this.cells = currentMaze.cells;
		}
	};
});

mazeApp.controller('MazeCtrl', function($scope, MazeService) {

	var logs = []; //'hi', 'what'];

	$scope.maze = MazeService;
	$scope.logs = logs;
	$scope.draggableCellTypes = [MazeCellType.START, MazeCellType.FINISH];

	$scope.cellClicked = function(cell) {
		// console.log('cell type: ', cell.type);
		this.logs.push('cell clicked: {' + cell.row + ',' + cell.column + '} type: ' + cell.type);
		cell.type = cell.type === 1 ? 2 : 1;
		// cell.type = Math.floor( Math.random() * 4 ) + 1;
		// console.log('cell type: ', cell.type);
	};

	$scope.changeType = function(data) {
		console.log('mazeApp changeType(): ', data);
	};

	$scope.previewCell = function(data) {
		console.log('mazeApp previewCell(): ', data);
	};

	$scope.removeCellPreview = function(data) {
		console.log('mazeApp removeCellPreview(): ', data);
	};
});

mazeApp.directive('mazeSettings', function(MazeService){
	return {
		restrict: 'E',
		scope: false,
		templateUrl: 'view/maze-settings.html',
		controller: function($scope, $element, $attrs, MazeService) {
			$scope.maze = MazeService;

			$scope.$watch('maze', function(){
				$scope.maze = MazeService;
			});
		}
	};
});


