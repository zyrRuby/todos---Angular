(function (angular) {
	'use strict';

	var app = angular.module('todosAPP',['ServiceModule'])
	app.controller('todosController',['$scope','$location','todoSevice',function($scope,$location,todoSevice) {
		$scope.todolist = todoSevice.getlist();
		//批量切换功能
		$scope.toggleAllValue = false;
		$scope.toggleAll = function() {
			$scope.todolist.forEach(function(value,index) {
				value.complete = $scope.toggleAllValue;
			})
			todoSevice.save($scope.todolist);
		}
		//添加任务功能
		$scope.inpValue = '';
		$scope.add = function(inpValue) {
			if(!inpValue) return;
			var newtodos = {
				name:inpValue,
				complete:false
			}
			$scope.todolist.push(newtodos);
			todoSevice.save($scope.todolist);
			$scope.inpValue = '';
		}
		//修改功能
		$scope.isEditing = -1;
		$scope.edit = function(index) {
			$scope.isEditing=index;
		}
		$scope.save  =function() {
			$scope.isEditing=-1;
			todoSevice.save($scope.todolist);
		}
		//显示待做任务数的功能
		$scope.todoCount = function() {
			return $scope.todolist.filter(function(value,index) {
				return value.complete == false
			}).length
		}
		//批量删除已经完成的任务的功能
		$scope.remove = function() {
			$scope.todolist = $scope.todolist.filter(function(value,index) {
				return value.complete == false;
			})
			console.log($scope.todolist);
			todoSevice.save($scope.todolist);
			console.log($scope.todolist);
		}
		//单个删除任务的功能
		$scope.del = function(index) {
			$scope.todolist.splice(index,1);
			todoSevice.save($scope.todolist);
		}

		//监测url锚点不同的变化，过滤显示不同的数据
		$scope.isComplete = {};
		$scope.loc = $location;
		$scope.$watch('loc.url()',function(now,prev) {
			switch(now) {
				case '/active':
				$scope.isComplete = {complete:false}
				break;
				case '/completed':
				$scope.isComplete = {complete:true}
				break;
				case '/':
				$scope.isComplete = {}
				break;
			}
		})

	}])

})(angular);
