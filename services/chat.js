(function () {

	var app = angular.module('ngKanban');

	app.factory('chatService', ['$rootScope', '$q', function ($rootScope, $q) {

		var conversations = [];

		firebase.database().ref('chat/conversations/').on('value', function (snapshot) {

			if (snapshot.hasChildren()) {
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

		function getConversationMessages(conversationId) {
			
			var deferred = $q.defer();

			firebase.database().ref('ref(chat/conversations' + conversationId).once('value', function (snapshot) {
				var messages = [];

				snapshot.forEach(function (childSnapshot) {
					conversations.push(childSnapshot.val());
				});
				deferred.resolve(messages);
			});
			return deferred.promise;
		}

		return {
			getConversations: getConversations
		};
	}]);
})();