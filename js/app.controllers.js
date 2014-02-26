'use strict';

angular.module('rastaa.controllers', [])
        .controller('bethel', [bethel])
        .controller('exodus',['$scope','fetch','$rootScope','$location','$routeParams',exodus])
        .controller('usersCtrl', ['$scope','$routeParams','$rootScope','crud',usersCtrl])
        .controller('clientsCtrl', ['$scope','$routeParams','$rootScope',exodus]);

function bethel(){}
function exodus($scope,fetch,$rootScope,$location,$routeParams){
   $rootScope.breadcrum=[false,{"text":"Login Form","class":"active"}];
   var service=dynamis.get("SITE_SERVICE")||"http://www.iyona.co.za/servers/rastaa/inc/services.php";
   $scope.login=function(){
      var u,p,USER_NAME,procurator,msg;
      if("data" in $scope===false||"username" in $scope.data===false){iyona.msg("Your are required to fill in the username",false," danger bold");return false;}
      if("data" in $scope===false||"password" in $scope.data===false){iyona.msg("Your are required to fill in the password",false," danger bold");return false;}
      u=$scope.data.username;p=md5($scope.data.password);//aliquis
      $scope.attempt=0;
      fetch.post(service,{"militia":"aliquis","u":u,"p":p},function(server){var setting = new configuration(),row; iyona.deb(setting,'settting');
         if(server.length>0){row=server.rows[0];procurator=(row['level']==='super')?1:0;iyona.deb(row,"row");
            USER_NAME={"operarius":row['username'],"licencia":row['aditum'],"nominis":row['name'],"jesua":row['jesua'],"procurator":procurator,"cons":row["sess"],"position":row['position']};
            dynamis.set("USER_NAME",USER_NAME,true);$rootScope['USER_NAME']=USER_NAME;
            setting.config().eternal();
            $rootScope.usr={"display":row['name'],"title":row['position'],"img":"images/avatar.jpg","link":"#profile/view/"+row['jesua']};
            $location.path("/genesis");
         }else{$scope.attempt++;msg='Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");
         }
      });//fetch callback
   }//login
   $scope.forgot=function(){
      if("data" in $scope===false||"username" in $scope.data===false){iyona.msg("Your are required to fill in the email",false," danger bold");return false;}
      var u=$scope.data.username;
      fetch.post(service,{"militia":"oblitus","u":u},function(server){
         iyona.deb(server,"server");var clss=server.mail.status?" success":" danger bold";
         iyona.msg(server.mail.msg,false,clss)
      });//fetch
   }//forgot
   if($routeParams.login=='logoff'){ if(confirm("You are about to logout")){
      fetch.post(service,{"militia":"vel deleri"},function(server){
         iyona.msg(server.notitia.msg,server);});
         if("localStorage" in window) localStorage.clear(); sessionStorage.clear();}}
}
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
   scope.details.jesua=$scope.jesua;

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