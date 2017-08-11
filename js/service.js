(function(angular) {
    angular.module('ServiceModule',[])
    .service('todoSevice',['$window',function($window) {
        var todolist = JSON.parse($window.localStorage.getItem('list')) || [];
        this.getlist = function() {
            return todolist;
        }
        this.save = function(newtodos) {
            $window.localStorage.setItem('list',JSON.stringify(newtodos));
        }
    }])
})(angular)