'use strict';
angular.module('rastaa.controllers', [])
        .controller('bethel', ['$scope','$rootScope',bethel])
        .controller('exodus',['$scope','fetch','$rootScope','$location','$routeParams','crud',exodus])
        .controller('modalShow',['$scope','$modalInstance','passing',modalShow])
        .controller('usersCtrl', ['$scope','$routeParams','crud',usersCtrl])
        .controller('banksCtrl', ['$scope','$routeParams','crud',banksCtrl])
        .controller('bankHistoryCtrl', ['$scope','$routeParams','crud',bankHistoryCtrl])
        .controller('accountsCtrl', ['$scope','$routeParams','crud',accountsCtrl])
        .controller('suppliersCtrl', ['$scope','$routeParams','crud',suppliersCtrl])
        .controller('billsCtrl', ['$scope','$routeParams','crud','notitia',billsCtrl])
        .controller('pettyCtrl', ['$scope','$routeParams','crud',pettyCtrl])
        .controller('pettyHistoryCtrl', ['$scope','$routeParams','crud',pettyHistoryCtrl])
        .controller('clientsCtrl', ['$scope','$routeParams','crud','notitia',clientsCtrl])
        .controller('invoicesCtrl', ['$scope','$routeParams','crud',invoicesCtrl])
        .controller('projectsCtrl', ['$scope','$routeParams','crud',projectsCtrl])
        .controller('tabularCtrl', ['$scope','crud','$routeParams','fetch','$timeout',tabularCtrl])
        .controller('rptAFP', ['$scope','$routeParams','crud','fetch',rptAFP]);
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
function accountsCtrl($scope,$routeParams,crud){
   var title="Bank Account",profile='accounts',defaultScope=dynamis.get("defaultScope",true)[profile];
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
   dynamis.set("href",{"bank":$routeParams.jesua});//storage for pettyHistory

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
}
//============================================================================//
function bankHistoryCtrl($scope,$routeParams,crud){
   var title="Bank Transaction",profile='bank transaction',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){
      if(!$scope.data.jesua){$scope.data.received_by=impetroUser().operarius; $scope.data.approved_by=null;}
      else {$scope.data.received_by=null; $scope.data.approved_by=impetroUser().operarius;}
      $scope.data.bank_ref=dynamis.get("href").bank;//restore from bank
      $scope.dataForm=dataForm;crud.submit($scope,profile);
   }
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      if($scope.data.deposit) $scope.data.inOut='deposit'; else $scope.data.inOut='withdrawn';
   });
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
   var d=new Date();$scope.due_date={};$scope.due_date.minDate=d;
   $scope.enumBanks=[{"alpha":null,"display":"None"}];
   if($routeParams.view==='new'){defaultScope.details.innitiator=dynamis.get("USER_NAME",true).operarius;}

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){
      defaultScope.details.jesua={"delta":"!@=!#","alpha":$routeParams.jesua};
      if($scope.data.jesua){defaultScope.details.approver=dynamis.get("USER_NAME",true).operarius;}
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
function invoicesCtrl($scope,$routeParams,crud){
   var title="Invoice",profile='invoices',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;
   var d=new Date();$scope.due_date={};$scope.due_date.minDate=d;
   if($routeParams.view==='new'){
      defaultScope.details.client_name = dynamis.get("href").client;
      defaultScope.details.innitiator=dynamis.get("USER_NAME",true).operarius;
   }

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){
      if($scope.data.expenseOthers)$scope.data.expense=$scope.data.expenseOthers;//@see function categoryOther
      if($scope.data.revenueOthers)$scope.data.revenue=$scope.data.revenueOthers;//@see function categoryOther
      if($scope.data.jesua){defaultScope.details.approver=dynamis.get("USER_NAME",true).operarius;}
      $scope.dataForm=dataForm;
      crud.submit($scope,profile);
   }
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.categoryOther=function(val,revenue){
      var tmp;
      if(!revenue){
         tmp = $scope.data.expense+': ';
         $scope.data.expenseOthers = tmp.replace(/:.+/,': '+val);
      }else{
         tmp = $scope.data.revenue+': ';
         $scope.data.revenueOthers = tmp.replace(/:.+/,': '+val);
      }

   }

   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      if(!$scope.data.jesua)$scope.data.approver=dynamis.get("USER_NAME",true).operarius;
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
function clientsCtrl($scope,$routeParams,crud){
   var title="Client",profile='clients',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;
   dynamis.del("href");//empty href for security

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){iyona.deb("BROADCASTING",e,server);
      if($scope.data.jesua) dynamis.set("href",{"client":$scope.data.name});
   });
}
//============================================================================//
function pettyCtrl($scope,$routeParams,crud){
   var title="Petty Cash",profile='petty',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;
   dynamis.set("href",{"petty":$routeParams.jesua});//storage for pettyHistory

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
}
//============================================================================//
function pettyHistoryCtrl($scope,$routeParams,crud){
   var title="Petty History",profile='petty history',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.jesua=$routeParams.jesua||null;

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){
      if(!$scope.data.jesua){$scope.data.received_by=impetroUser().operarius; $scope.data.approved_by=null;}
      else {$scope.data.received_by=null; $scope.data.approved_by=impetroUser().operarius;}
      $scope.data.petty_ref=dynamis.get("href").petty;//restore from petty
      $scope.dataForm=dataForm;crud.submit($scope,profile);
   }
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){
      if($scope.data.deposit) $scope.data.inOut='deposit'; else $scope.data.inOut='withdrawn';
   });
}
//============================================================================//
function rptAFP($scope,$routeParams,crud,fetch){
   var title="AFP report",profile='payable',defaultScope=dynamis.get("defaultScope",true)[profile];
   defaultScope.details.name={"delta":"!@=!#","alpha":$routeParams.jesua};$scope.currency='USD';
   var on=true,d=new Date();$scope.start_date={},$scope.end_date={};$scope.end_date.minDate=d;$scope.start_date.minDate=d;

   crud.get($scope,title,profile,defaultScope);
   fetch.post(sessionStorage.SITE_SERVICE,{"militia":"reports-afp","jesua":$routeParams.jesua},function(server){iyona.deb("BANK",server);
      if(typeof server.bills!=="undefined"&&typeof server.bills.rows!=="undefined"){
         if(server.bills.rows){
            $scope.opt.itemsVal = {"bills":server.bills.rows};//SETiSCROLL('#repTable');
            var x,l=$scope.opt.itemsVal.bills.length;$scope.opt.total=0;
            for(x=0;x<l;x++){var row=$scope.opt.itemsVal.bills[x]; if(row.payable_ref){$scope.opt.total+=parseFloat(row.amount_due);} }
         }
         if(typeof server.payable!=="undefined"){
            $scope.data = server.payable.rows[0];
            if($scope.typeahead.signature1){
               var signature1=$scope.typeahead.signature1,signature2=$scope.typeahead.signature2,len,data,obj;
               len=signature1.length; for(x=0;x<len;x++){obj=signature1[x]; if(obj.alpha===$scope.data.signature1){$scope.data.signature1=obj;break;} }
               len=signature2.length; for(x=0;x<len;x++){obj=signature2[x]; if(obj.alpha===$scope.data.signature2){$scope.data.signature2=obj;break;} }
            }
         }
         l=server.banks.rows.length;$scope.opt.banks={};
         for(x=0;x<l;x++){row=server.banks.rows[x]; row.balance=row.balance||0;  $scope.opt.banks[row.jesua]=row; }
         iyona.deb("BACK",$scope.opt.banks);
         $scope.data.accountant=impetroUser().operarius;
         $scope.data.created=d;
         if($scope.opt.total>0){$scope.opt.account="#ACC001";}
      }else{
         iyona.msg("No result found");$scope.data.msg="There was no record found on the server.";
      }
   });
   $scope.submit=function(dataForm){
      defaultScope.details.jesua={"delta":"!@=!#","alpha":$routeParams.jesua};
      $scope.dataForm=dataForm;
      crud.submit($scope,profile);}
   $scope.delete=function(){crud.delete($scope,profile);}
   $scope.order=function(ord){$scope.ord=ord;}
   $scope.sum=function(amount,ref,cur){
      $scope.currency=cur;
      if(ref==null||ref==0)$scope.opt.total+=parseFloat(amount);
      else if($scope.opt.total>0)$scope.opt.total-=parseFloat(amount);
      iyona.deb($scope.opt.total,ref);
   }
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
   $scope.$on("readyForm",function(e,data){
      var now = new Date().format("isoDateTime");
      $scope.date.created = now;
   });
   $scope.$on("readyTypeahead",function(e,data){
      //search object signatures for value to be selected
      var len,x,obj;
      if(typeof data.signature1!="undefined"){ len=data.signature1.length; for(x=0;x<len;x++){obj=data.signature1[x]; if(obj.alpha===$scope.data.signature1){$scope.data.signature1=obj;break;} } }
      if(typeof data.signature2!="undefined"){ len=data.signature2.length; for(x=0;x<len;x++){obj=data.signature2[x]; if(obj.alpha===$scope.data.signature2){$scope.data.signature2=obj;break;} } }
   });
}
//============================================================================//
function tabularCtrl($scope,crud,$routeParams,fetch,$timeout){
   var title="ADSL Customers",profile='system reports',defaultScope=dynamis.get("defaultScope",true)[profile];
   var month = new Date().getMonth()+1,view=$routeParams.view,jesua=$routeParams.jesua;
   $scope.sorts=[{"name":"By Accounts","key":"account"},{"name":"By Size","key":"total"},{"name":"By Status","key":"status"}];$scope.sortable=null;$scope.reverse=false;

   crud.get($scope,title,profile,defaultScope);
   $scope.submit=function(dataForm){$scope.dataForm=dataForm;}
   $scope.delete=function(){$scope.data.name.delta=null;crud.delete($scope,profile);}
   $scope.DBenum=function(links,parent,col1,key,type){crud.DBenum(links,parent,col1,key,type)}//enum
   $scope.DBset=function(field,val){return crud.DBset(field,val);}
   $scope.arrange=function(sort){$scope.sortable=sort;$scope.reverse=!$scope.reverse;}
   $scope.licentia=getLicentia();$scope.prima=impetroUser().jesua;
   $scope.$on("readyForm",function(e,server){});
   $scope.$on("readyList",function(e,server){});
}//function
//============================================================================//