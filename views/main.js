var module = angular.module("mod1",[]);

module.controller('myCtrl',function($http) {
  var that = this;
  this.submit = false;
  this.FormData = {};
  this.FormData.country = '';
  $http.get("https://restcountries.eu/rest/v1/region/Europe")
  .then(function(response) {
      that.mydata = response.data;
  });
  this.formSubmit = function(){
    $http.post("http://localhost:3000/api/save",that.FormData)
    .then(function(response) {
      that.submit = true;
      console.log(response.data);
    },function(response) {
      that.responce = response.data.details[0].message;
      console.log(response.data.details[0]);
    });
  }

})
