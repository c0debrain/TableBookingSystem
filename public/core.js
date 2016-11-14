
var scotchTodo=angular.module('scotchTodo',[]);

function mainController($scope,$http) {
    $scope.formData={};


    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos=data;
            console.log(data);
        })
        .error(function (error) {
            console.log('Error'+error);
        });

    // when submitting the add form, send the text to the node API

    $scope.createTodo=function () {
        $http.post('/api/todos',$scope.formData)
            .success(function (data) {
                $scope.formData={};
                $scope.todos=data;
                console.log(data);
            })
            .error(function (error) {
                console.log('Error'+ error)
            });
    };


    $scope.deleteTodo=function (id) {
        $http.delete('/api/todos/'+id)
            .success(function (data) {
                $scope.todos=data;
                console.log(data);
            })
            .error(function (error) {
                console.log('Error'+ error)
            });
    };



    $scope.updateTodo=function (id) {



        $http.put('/api/todos/'+id,{
            date: 1,
            time: 1,
            size: 1,
            phone : 1,
            name: 1

        })
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (error) {
                console.log('Error'+ error)

            })

    };










};














