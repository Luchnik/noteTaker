myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$location', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  return {
    login: function(user) {
      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $location.path('/success');
      }).catch(function(error) {
        $rootScope.message = error.message;
      });
      $rootScope.message = 'Welcome ' + $scope.user.email;
    },
    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {

        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email
        }); // user info

        $rootScope.message = 'Hi ' + user.firstname + ', Thanks for registering';
      }).catch(function(error) {
        $rootScope.message = error.message;
      }); //createUser
    }
  };


}]);
