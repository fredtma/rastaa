'use strict';

angular.module('rastaa.controllers', [])
        .controller('bethel', [bethel])
        .controller('exodus', [exodus])
        .controller('usersCtrl', ['$scope','$routeParams','$rootScope','crud',usersCtrl])
        .controller('exodus', ['$scope','$routeParams','$rootScope',exodus]);

function bethel(){}
function exodus(){}
function usersCtrl($scope,$routeParams,$rootScope,crud){
   var keyName="Administrator",profile='profile',scope=dynamis.get("scope",true)[profile];iyona.deb('SCOPE',scope);
   var menu=scope.menu,options={};
   $rootScope.breadcrum=$routeParams.view=='list'?menu.list:menu.details;
   $rootScope.crud.alpha=menu.alpha;
   $rootScope.crud.omega=$routeParams.view=='list'?false:true;

   options.consuetudinem=scope.consuetudinem;
   options.foreign=scope.foreign;
   options.extra=scope.extra;
   $scope.view=$routeParams.view||'list';
   $scope.jesua=$routeParams.jesua||'';
   $scope.cons={};
   $scope.opt=options;
   $scope.btn="Add a new "+keyName;
   $scope.btnClass='form-control btn btn-primary';
   scope.details.username={"delta":"!@=!#","alpha":$scope.jesua};

   crud.get($scope,scope,keyName,profile,options);
   $scope.submit=function(){crud.submit($scope,scope,profile,options);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      $scope.cons.comm=server.iota[0].communication;
   });
}
function clientsCtrl(){}