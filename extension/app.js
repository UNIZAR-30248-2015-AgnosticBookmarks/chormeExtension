var module = angular.module('AgnosticBookmarksChromeExtension', ['ui.router']);

module.config(function($stateProvider, $urlRouterProvider) {

    function checkLoggedIn(UserService, state) {
        var sessionState = UserService.getSessionState();
        if (sessionState === 'disconnected') state.go('access');
    }

    function checkNotLoggedIn(UserService, state) {
        var sessionState = UserService.getSessionState();
        if (sessionState === 'connected') state.go('home');
    }

    $stateProvider
        .state('popup', {
            url: '/popup',
            templateUrl: 'components/views/popup.html',
            controller: 'popupController',
            onEnter: ['UserService', '$state', checkNotLoggedIn]
        })

    $urlRouterProvider.otherwise('/popup');
})