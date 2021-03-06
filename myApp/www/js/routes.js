var app = angular.module('starter', [
  'ionic',
  'slick',
  'app.controller',
  'home.controller',
  'results.controller',
  'result.controller',
  'saved.controller',
  'savedresult.controller'
 ]);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })

    .state('app.browse', {
      url: "/results",
      views: {
        'menuContent' :{
          templateUrl: "templates/results.html",
        }
      }
    })

    .state('app.saved', {
      url:"/saved",
      views: {
        'menuContent' :{
          templateUrl: "templates/my-saved.html",
        }
      }
    })

    .state('app.results', {
      url: "/results",
      views: {
        'menuContent' :{
          templateUrl: "templates/results.html",
        }
      }
    })

    .state('app.single', {
      url: "/result/:id",
      views: {
        'menuContent' :{
            templateUrl: "templates/result.html",
        }
      } 
    })  

    .state('app.resultsaved', {
      url: "/savedresult/:id",
      views: {
        'menuContent' :{
          templateUrl: "templates/saved-result.html"
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

