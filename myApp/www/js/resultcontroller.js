var app = angular.module('result.controller', ['collection.service']);

var resultController = function(params, collectAPI, $q, $scope, $ionicPopup){
  var _this = this;

  this.result = {};
  collectAPI.collectDetail(params.id).success(function(data){
    _this.result = data.artObject;
  });

  $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Schilderij bestaat al',
     template: 'Je hebt dit schilderij al eerder opgeslagen'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };

   $scope.showAlertAlready = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Gelukt',
     template: 'Schilderij succesvol opgeslagen'
   });
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
  };


  _this.resultSaver = function(){
    if(!localStorage.getItem('saved')){
      var artObjects = [];
      artObjects.push(_this.result);
      localStorage.setItem('saved', JSON.stringify (artObjects));
    }else{

      var deffered = $q.defer();

      var savedArt = [];
      savedArt = JSON.parse(localStorage.getItem('saved'));
      var i = 0;
      var c = 0;
      for (; i < savedArt.length; i++) {
        var checker;
        i += checker = (savedArt[i].id === _this.result.id);  
          console.log(checker);
          console.log(i);

        if(checker === true){
          console.log('already saved');
          c++
        }else{
        };

      };

      deffered.resolve(resultCheck(c, savedArt));

      return deffered.promise;


      function resultCheck(c, savedArt){
        
        console.log(c);
        console.log(savedArt.length);
        if (c === 0){
          savedArt.push(_this.result);
          $scope.showAlertAlready();
          localStorage.setItem('saved', JSON.stringify (savedArt));

        }else{
          $scope.showAlert();
        }
      }
    }
  } 
}

resultController.$inject = ['$stateParams', 'collectService', '$q', '$scope', '$ionicPopup'];
app.controller('ResultCtrl', resultController);