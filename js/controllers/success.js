myApp.controller('SuccessController',
  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'FIREBASE_URL',
  function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    auth.$onAuth(function(authUser) {
      if (authUser) {
        var notesRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/notes');
        var notesInfo = $firebaseArray(notesRef);

        $scope.addNote = function() {
          notesInfo.$add({
            name: $scope.notename,
            date: Firebase.ServerValue.TIMESTAMP
          }).then(function() {
            $scope.notename = '';
          });
        } // add note
      }
    });

}]);
