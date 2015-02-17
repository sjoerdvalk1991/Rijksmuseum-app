var app = angular.module('saved.controller', ['slick']);

var savedController = function(params){
  var _this = this;
 
  this.results = {};

  this.getSaved = function(){
    var saved = JSON.parse(localStorage.getItem('saved'));
    return saved;
  }

  this.alreadySaved = function(){
    console.log('test');
  }

  this.results = _this.getSaved();

}

savedController.$inject = ['$stateParams'];
app.controller('SavedCtrl', savedController);