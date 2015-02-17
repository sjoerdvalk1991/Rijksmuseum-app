var app = angular.module('savedresult.controller', ['collection.service']);

var savedResultController = function(params, collectAPI, $q, $scope, $ionicPopup, $state){
  var _this = this;

  this.result = {};

  collectAPI.collectDetail(params.id).success(function(data){
    _this.result = data.artObject;
  });

  $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Geslaagd!',
       template: 'Schilderij is succesvol verwijderd'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };


  this.compareResult = function(){

    var savedArt = [];
    savedArt = JSON.parse(localStorage.getItem('saved'));
    var deffered = $q.defer();
    var i = 0;
    var newSave = [];
    for (; i < savedArt.length; i++) {
        if(savedArt[i].id == _this.result.id){
          
        }else{
          newSave.push(savedArt[i]);
        }

    }
     
    deffered.resolve(resultUpdate(newSave));

    return deffered.promise;
  
    function resultUpdate(newSave){
      console.log(newSave.length);
      if(newSave.length > 0){
        console.log('test');
        localStorage.setItem('saved', JSON.stringify (newSave));
        $state.go('app.saved', {url:"/saved"});
        $scope.showAlert();
      }else{
        $state.go('app.saved', {url:"/saved"});
        $scope.showAlert();
        localStorage.setItem('saved', JSON.stringify (newSave));
      }
    }
  }

  this.resultDelete = function(){

      _this.compareResult ();
  }

}

savedResultController.$inject = ['$stateParams', 'collectService', '$q', '$scope', '$ionicPopup', '$state'];
app.controller('SavedResultCtrl', savedResultController);
