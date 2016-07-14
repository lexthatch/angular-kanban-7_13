(function () {

	var app = angular.module('ngKanban');

	app.factory('chatService', ['$rootScope', function ($rootScope) {

		var conversations = [];

		firebase.database().ref('chat/conversations/').on('value', function (snapshot) {

if(snapshot.hasChildren()) {
	conversations = [];
}

			snapshot.forEach(function (childSnapshot) {
				conversations.push(childSnapshot.val());
			});
console.log('Conversations', conversations)
			$rootScope.$broadcast('userlist-updated', users);
		});


		function getConversations() {
			return conversations;

		}
		

		return {
		getConversations: getConversations
	};
}]);
})();