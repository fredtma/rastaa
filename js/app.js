'use strict';
angular.module('rastaa', ['ngRoute','ngSanitize', 'ngAnimate',
   'rastaa.filters',
   'rastaa.services',
   'rastaa.controllers'
])
.config(['$routeProvider', function($routeProvider) {
$routeProvider
   .when('/genesis/:view?', {templateUrl: 'cera/home.html'})
   .when('/exodus/:login?', {templateUrl: 'cera/login.html'})
   .when('/clients/:view?/:jesua?', {templateUrl: 'cera/clients.html'})
   .when('/profile/:view?/:jesua?', {templateUrl: 'cera/users.html'})
   .otherwise({redirectTo: '/genesis'});
}]).run(['$location','$rootScope',function($location,$rootScope){
   $rootScope.menus=[{"id":"top","span":"fa-home","text":"Dashboard","link":"#genesis"},{"id":"about","span":"fa-user","text":"Profile","link":"#profile/list"},{"id":"portfolio","span":"fa-th","text":"Account due","link":"#clients/list"},{"id":"contact","span":"fa-envelope","text":"Contact"}];
   $rootScope.icons=[{"link":"","class":"fa-user","text":"Profile"},{"link":"","class":"fa-th-list","text":"Report"},{"link":"","class":"fa-dollar","text":"Petty Cash"},{"link":"","class":"fa-wrench","text":"Setting"},{"link":"#exodus/logoff","class":"fa-sign-out","text":"Logout"}];
   $rootScope.footer=[{"link":"#","text":"Selection","title":"Option 1"},{"link":"#","text":"Selection","title":"Option 2"}];
   var row=dynamis.get("USER_NAME",true);
   $rootScope.usr={"display":row['nominis'],"title":row['position'],"img":"images/avatar.jpg","link":"#profile/view/"+row['jesua']};
   $rootScope.crud={};
}]);
configuration.prototype.eternal=function(){
   var d=new Date().format("isoDateTime");
   var scope={
      "profile":{
         "mensa":"users",
         "creation":{"jesua":{"type":"TEXT","key":"unique"},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"username":{"type":"TEXT","unique":true},"firstname":{"type":"TEXT","null":true},"lastname":{"type":"TEXT"},"email":{"type":"TEXT","null":true},"password":{"type":"TEXT","null":true},"mobile":{"type":"TEXT"},"title":{"type":"TEXT"},"communication":{"type":"TEXT"},"position":{"type":"TEXT"} },
         "extra":{"title":{"enum":['Mr.','Mrs.','Miss.','Doc.','Sir.']},"communication":{"enum":['email','sms','mobile','browser']}},
         "details":{"created":d, "modified":d,"jesua":null,"firstname":null,"lastname":null,"username":null,"email":null,"mobile":null,"title":"Mr.","communication":"email","position":null},
         "list":{"jesua":null,"firstname":null,"lastname":null,"username":null,"email":null,"mobile":null},
         "menu":{
            "details":[{"text":"Administrator' List", "link":"#profile/list"},{"text":"Administrator","class":"active"}],
            "list":[{"text":"Administrator' List","class":"active"}],
            "alpha":"#profile/new"}
        //"consuetudinem":"foreign",
        //"foreign":{"link_users_clients":{"parent":"username","col1":"username","col2":"client_name","refField":"name","refTable":"clients","title":"Link Administrator to Clients"}}
      }
   }
   dynamis.set("scope",scope,true);
};
(function(){var settings= new configuration(); settings.eternal();  })();