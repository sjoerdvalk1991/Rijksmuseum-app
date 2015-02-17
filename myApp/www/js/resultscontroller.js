var app = angular.module('results.controller', ['collection.service', 'slick']);

var resultsController = function(collectAPI, $q, $timeout){

  var _this = this;

  this.results = {};

  _this.timeNow = Date.now();

  _this.check = 1;

  if(!localStorage.getItem('timeStamp')){
  _this.timeMs = 0;
  }else{
  _this.timeMs = JSON.parse(localStorage.getItem('timeStamp'));

  }

  this.loadArt = function(){
    var deffered = $q.defer();
    var timeStamp = Date.now(); 
    _this.timeMs = timeStamp;
    localStorage.setItem('timeStamp', JSON.stringify(timeStamp));
    collectAPI.getCollects().success(function(data){
      localStorage.setItem('dailyart', JSON.stringify (data));
      _this.check = 1;
      _this.results = data.artObjects;
      $('.come-in').hide();
      deffered.resolve(fade());
      
      return deffered.promise;

      function fade(){
        $timeout(function(){
          $('.come-in').fadeIn( "slow", function (){
            console.log('testing');
          });

        },3000);  
      }
       
    });
  }
  
  
  if(!localStorage.getItem('dailyart')){
    _this.loadArt();
  
  }else if(_this.timeMs+86400000< _this.timeNow){
    console.log('test remove');
    localStorage.removeItem('timeStamp');
    localStorage.removeItem('dailyart');

    _this.loadArt();

  }else{
    var localArt = JSON.parse(localStorage.getItem('dailyart'));
    console.log(_this.timeMs);
    _this.results = localArt.artObjects;
    $('.come-in').hide();
    $('.come-in').fadeIn( "slow", function (){
      console.log('testing');
  });

  };

};


resultsController.$inject = ['collectService', '$q', '$timeout'];
app.controller('ResultsCtrl', resultsController);