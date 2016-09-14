myApp.controller('SuccessController',
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser) {
      if (authUser) {
        var tasksRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/tasks');
        var tasksInfo = $firebaseArray(tasksRef);

        $scope.tasks = tasksInfo;

        // how many tasks
        tasksInfo.$loaded().then(function(data) {
          $rootScope.howManyTasks = tasksInfo.length;
        });

        tasksInfo.$watch(function(data) {
          $rootScope.howManyTasks = tasksInfo.length;
        });

        $scope.addTask = function() {
          tasksInfo.$add({
            name: $scope.taskname,
            date: Firebase.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.taskname = '';
          });
        } // add note

        $scope.deleteTask = function(key) {
          tasksInfo.$remove(key);
        } //delete note
      }
    });

}]);
