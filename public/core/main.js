/**
 * Created by charles on 11/12/16.
 */


angular.module('bookingSystem',['commonController']);




// Controller =========================================================================================================
//
// var commonController=angular.module('commonController',[]);
//
// commonController
//     .controller('mainController',function($scope,$http) {
//         $scope.formData={};
//         $scope.editingData={};
//         $scope.advancedFlag=false;
//         $scope.confirmData={};
//
//
//         $scope.advancedSearch=function () {
//
//             $scope.advancedFlag=$scope.advancedFlag==false?true:false;
//
//         };
//
//         $scope.validateConfirmation=function (todo,confirmCode) {
//             console.log(todo.code);
//             $scope.confirmData[todo._id]=$scope.confirmData[todo._id]==false?true:false;
//             // $scope.advancedFlag=$scope.advancedFlag==false?true:false;
//             if (todo.code == confirmCode) {
//
//                 $scope.editingData[todo._id] = true;
//             }
//         };
//
//
//
//
//
//
//         // when landing on the page, get all todos and show them
//         $http.get('/api/todos')
//             .success(function (data) {
//                 $scope.todos=data;
//                 console.log(data);
//                 for (var i = 0; i < $scope.todos.length; i++) {
//                     $scope.editingData[$scope.todos[i]._id] = false;
//                 }
//                 for (var i = 0; i < $scope.todos.length; i++) {
//                     $scope.confirmData[$scope.todos[i]._id] = false;
//                 }
//                 console.log($scope.editingData);
//
//             })
//             .error(function (error) {
//                 console.log('Error'+error);
//             });
//
//         // when submitting the add form, send the text to the node API
//
//         $scope.createTodo=function () {
//             $scope.formData.code=Math.floor(Math.random()*100000);
//             $scope.formData.table=Math.ceil(Math.random()*10);
//             $http.post('/api/todos',$scope.formData)
//                 .success(function (data) {
//                     window.alert('Your Confirmation Code is : '+ $scope.formData.code +' \n Your Table Number is '+ $scope.formData.table);
//                     $scope.formData={};
//                     $scope.todos=data;
//                     console.log(data);
//                 })
//                 .error(function (error) {
//                     console.log('Error'+ error)
//                 });
//         };
//
//
//         $scope.deleteTodo=function (id) {
//             $http.delete('/api/todos/'+id)
//                 .success(function (data) {
//                     $scope.todos=data;
//                     console.log(data);
//                 })
//                 .error(function (error) {
//                     console.log('Error'+ error)
//                 });
//         };
//
//
//
//         $scope.updateTodo=function (todo) {
//             // for(var i=0;$scope.todos.length;i++){
//             //     if($scope.todos[i].name==todo.name){
//             //         $scope.todos[i].name=event.taget;
//             //     }
//             // }
//
//             $scope.editingData[todo._id] = false;
//
//             $http.put('/api/todos/'+todo._id,{
//                 date:todo.date,
//                 time:todo.time,
//                 size:todo.size,
//                 phone:todo.phone,
//                 name:todo.name,
//                 code:todo.code,
//                 table:todo.table
//
//             })
//                 .success(function (data) {
//                     $scope.todos = data;
//                     console.log(data);
//                 })
//                 .error(function (error) {
//                     console.log('Error'+ error)
//
//                 })
//
//         };
//
//
//
//
//
//         $scope.modify=function (id) {
//             $scope.editingData[id] = true;
//         };
//
//
//
//
//
//
//
//
//
//
//     });
//
//























