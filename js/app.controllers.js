'use strict';
angular.module('rastaa.controllers', [])
        .controller('bethel', ['$scope','$rootScope',bethel])
        .controller('exodus',['$scope','fetch','$rootScope','$location','$routeParams','crud',exodus])
        .controller('modalShow',['$scope','$modalInstance','passing',modalShow])
        .controller('usersCtrl', ['$scope','$routeParams','crud',usersCtrl])
        .controller('banksCtrl', ['$scope','$routeParams','crud',banksCtrl])
        .controller('suppliersCtrl', ['$scope','$routeParams','crud',suppliersCtrl])
        .controller('billsCtrl', ['$scope','$routeParams','crud','notitia',billsCtrl])
        .controller('projectsCtrl', ['$scope','$routeParams','crud',projectsCtrl])
        .controller('rptAFP', ['$scope','$routeParams','crud','fetch',rptAFP])
        .controller('clientsCtrl', ['$scope','$routeParams',exodus]);
//============================================================================//
function bethel($scope,$rootScope){$rootScope.menu=[];}
//============================================================================//
function exodus($scope,fetch,$rootScope,$location,$routeParams,crud){
   $rootScope.breadcrum=[false,{"text":"Login Form","class":"active"}];
   var service=dynamis.get("SITE_SERVICE")||"http://www.iyona.co.za/servers/rastaa/inc/services.php",
   gPlus={"user_info":{"id":0,"type":0,"emails":[{"value":0}]}};
	//=========================================================================//LOGIN BUTTON
   $scope.login=function(e,s,t){
      var u,p,USER_NAME,procurator,msg;
		s=s||gPlus.user_info.id;e=e||gPlus.user_info.emails[0].value;t=t||gPlus.user_info.kind;
      if(!s||s==0){//check form when it is not an automated login.
         if(angular.isObject(e)){angular.extend($scope,e);e=null}
         if(crud.check($scope,'dataForm')===false)return false;
         u=$scope.data.username;p=md5($scope.data.password);//aliquis
      }else{}//skip validation on autologin
      $scope.attempt=0;
		fetch.post(service,{"militia":"aliquis","u":u,"p":p,"s":s,"e":e,"t":t},function(server){var setting= new configuration(),row;
         iyona.deb("server",server);
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
	//=========================================================================//FORGOT BUTTON
   $scope.forgot=function(){
      if("data" in $scope===false||"username" in $scope.data===false){iyona.msg("Your are required to fill in the email",false," danger bold");return false;}
      var u=$scope.data.username;
      fetch.post(service,{"militia":"oblitus","u":u},function(server){
         var clss=server.mail.status?" success":" text-danger bold";iyona.msg(server.mail.msg,false,clss)
      });//fetch
   }//forgot
	//=========================================================================//IDENTITY
   $scope.google=function(){
      if (typeof chrome !== "undefined" && chrome.hasOwnProperty("app")) {
         gPlus = new GPLUS_USER();
         gPlus.getUserInfo(true,function(user_info,access_token){iyona.deb('user_info',user_info);
            if(user_info&&user_info.emails&&user_info.emails[0].value&&user_info.id){$scope.login(user_info.emails[0].value,user_info.id,user_info.kind);}
         });
      }
   }//plus login button
   //if (!$routeParams.login) {$scope.google();}
	//=========================================================================//LOGOFF
   if($routeParams.login=='logoff'){
      crud.modalMessage("You are about to logout?\n\rClick yes to remove all your details and session.",
         function(selected){$scope.modalSelected=selected;
            fetch.post(service,{"militia":"vel deleri"},function(server){iyona.msg(server.notitia.msg,server);});
            var isApp = (typeof chrome !== "undefined" && chrome.hasOwnProperty("identity"));
               if("localStorage" in window && !isApp) localStorage.clear(); sessionStorage.clear();//clear all session and traces of storages
               //gPlus=gPlus||new GPLUS_USER();if(gPlus.hasOwnProperty("revokeToken")) gPlus.revokeToken();//remove the token when loginOff
         },function(selected){iyona.debug("The button selected is::",selected);}
      );}
}
//============================================================================//
function modalShow($scope,$modalInstance,passing){
   $scope.passing = passing;
   $scope.ok=function(){$modalInstance.close(passing[0]);};
   $scope.cancel=function(){$modalInstance.dismiss('cancel')};
}
//============================================================================//
function usersCtrl($scope,$routeParams,crud){
   var title="Administrator",profile='profile',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
}
//============================================================================//
function banksCtrl($scope,$routeParams,crud){
   var title="Banks",profile='banks',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
}
//============================================================================//
function suppliersCtrl($scope,$routeParams,crud){
   var title="Suppliers",profile='suppliers',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
}
//============================================================================//
function billsCtrl($scope,$routeParams,crud,notitia){
   var title="Approval for payments",profile='bills',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;
   var d=new Date();$scope.amount_due={};$scope.amount_due.minDate=d;
   $scope.enumBanks=[{"alpha":null,"display":"None"}];if($routeParams.view==='new'){defaultScope.details.innitiator=dynamis.get("USER_NAME",true).operarius;}

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){defaultScope.details.jesua={"delta":"!@=!#","alpha":$routeParams.jesua};
      $scope.dataForm=dataForm;
      crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      /*iyona.deb("STARTING...",$scope.data.supplier_name);
      notitia.iRead('banks',{"where":"ndxSupplierBank","order":"asc"},function(e){
         var cursor = e.target.result;iyona.deb("Displaying.",cursor,e);
         if(cursor){var row=(typeof cursor.value!="undefined")?cursor.value:cursor;
            $scope.enumBanks.push({"alpha":row['name'],"display":row['name']});
            if("continue" in cursor)cursor.continue();
         } else {iyona.log("END OF CURSOR::",$scope.enumBanks);}
         iyona.deb("hoho",$scope.enumBanks);$scope.$apply();
      });*/
   });
}
//============================================================================//
function projectsCtrl($scope,$routeParams,crud){
   var title="Projects",profile='projects',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;
   var d=new Date();$scope.start_date={},$scope.end_date={};$scope.end_date.minDate=d;$scope.start_date.minDate=d;

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){defaultScope.details.jesua={"delta":"!@=!#","alpha":$routeParams.jesua};$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
}
//============================================================================//
function clientsCtrl(){}
//============================================================================//
function rptAFP($scope,$routeParams,crud,fetch){
   var title="AFP report",profile='payable',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};
   var on=true,d=new Date();$scope.start_date={},$scope.end_date={};$scope.end_date.minDate=d;$scope.start_date.minDate=d;

   crud.get($scope,title,profile,defaultScope);
   fetch.post(sessionStorage.SITE_SERVICE,{"militia":"reports-afp","jesua":$routeParams.jesua},function(server){iyona.log("DATA",server);
      if(typeof server.bills!=="undefined"&&typeof server.bills.rows!=="undefined"){
         $scope.opt.itemsVal = {"bills":server.bills.rows};//SETiSCROLL('#repTable');
         if(typeof server.payable!=="undefined")$scope.data = server.payable.rows[0];
         $scope.data.supervisor=impetroUser().operarius;
         $scope.data.created=d;
      }else{
         iyona.msg("No result found");$scope.data.msg="There was no record found on the server.";
      }
   });
   $scope.submit=function(dataForm){defaultScope.details.jesua={"delta":"!@=!#","alpha":$routeParams.jesua};$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.order=function(ord){$scope.ord=ord;}
   $scope.checkAll=function(){iyona.log("clicked...")
      if(typeof $scope.opt.itemsVal!=="undefined"&&typeof $scope.opt.itemsVal.bills!=="undefined"){
         var row,x,l=$scope.opt.itemsVal.bills.length;
         for(x=0;x<l;x++){ row=$scope.opt.itemsVal.bills[x];
            iyona.log(row,row.payable_ref,$scope.data.reference,l);
            row.payable_ref=(on)?$scope.data.reference:0;on=!on;
            iyona.log(row,row.payable_ref,$scope.data.reference,l);
         }
      }
   }
}