'use strict';
angular.module('rastaa', ['ngRoute','ngSanitize', 'ngAnimate','rastaa.filters','rastaa.services','rastaa.controllers','ui.bootstrap'])
.config(['$routeProvider','$compileProvider','datepickerConfig','datepickerPopupConfig', function($routeProvider,$compileProvider,datepickerConfig,datepickerPopupConfig) {
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|file|tel|mail):/);
   $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|chrome-extension|file):/);
   datepickerConfig.dayFormat="dd";datepickerConfig.dayHeaderFormat="EEE";datepickerConfig.dayTitleFormat="yyyy-MM-dd";datepickerConfig.maxDate=null;datepickerConfig.minDate=null;datepickerConfig.monthFormat="MMM";datepickerConfig.monthTitleFormat="yy";datepickerConfig.showWeeks=false;datepickerConfig.startingDay="1";datepickerConfig.yearFormat="yyyy";datepickerConfig.yearRange=10;datepickerPopupConfig.appendToBody=true;datepickerPopupConfig.currentText="Today.";datepickerPopupConfig.clearText="Clear";datepickerPopupConfig.closeOnDateSelection=true;datepickerPopupConfig.closeText="Close";datepickerPopupConfig.dateFormat="yyyy-MM-dd";datepickerPopupConfig.showButtonBar=false;datepickerPopupConfig.toggleWeeksText="Weeks";
$routeProvider
   .when('/genesis/:view?', {templateUrl: 'cera/home.html'})
   .when('/exodus/:login?', {templateUrl: 'cera/login.html'})
   .when('/clients/:view?/:jesua?', {templateUrl: 'cera/forms/clients.html'})
   .when('/profile/:view?/:jesua?', {templateUrl: 'cera/forms/users.html'})
   .when('/suppliers/:view?/:jesua?', {templateUrl: 'cera/forms/suppliers.html'})
   .when('/purchases/:view?/:jesua?', {templateUrl: 'cera/forms/purchases.html'})
   .when('/bills/:view?/:jesua?', {templateUrl: 'cera/forms/bills.html'})
   .when('/projects/:view?/:jesua?', {templateUrl: 'cera/forms/projects.html'})
   .when('/banks/:view?/:jesua?', {templateUrl: 'cera/forms/banks.html'})
   .when('/payable/:view?/:jesua?',{templateUrl:'cera/reports/payable.html'})
   .when('/reportAll/:report?',{templateUrl:'cera/reports/reports.html'})
   .when('/contact?', {templateUrl: 'cera/contacts.html'})
   .otherwise({redirectTo: '/genesis'});
}]).run(['notitia','$location','$rootScope','crud',function(notitia,$location,$rootScope,crud){
   $rootScope.menus=[
      {"id":"top","span":"fa-home","text":"Dashboard","link":"#genesis"},
      {"id":"about","span":"fa-user","text":"Profile","link":"#profile/list"},
      {"id":"portfolio","span":"fa-group","text":"Suppliers","link":"#suppliers/list"},
      {"id":"purchases","span":"fa-usd","text":"Approval for payments","link":"#bills/list"},
      {"id":"projects","span":"fa-suitcase","text":"Projects","link":"#projects/list"},
      {"id":"contact","span":"fa-envelope","text":"Contact","link":"#contact"}];
   $rootScope.icons=[{"link":"","class":"fa-user","text":"Profile"},{"link":"","class":"fa-th-list","text":"Report"},{"link":"","class":"fa-dollar","text":"Petty Cash"},{"link":"","class":"fa-wrench","text":"Setting"},{"link":"#exodus/logoff","class":"fa-sign-out","text":"Logout"}];
   $rootScope.footer=[{"link":"#","text":"Selection","title":"Option 1"},{"link":"#","text":"Selection","title":"Option 2"}];

   notitia.notitia();/*innitiate the DB*/
   if(!impetroUser().operarius&&$location.$$url!='/exodus') {$location.path("/exodus");}/*less intensive redirect when not login*/
   //$rootScope.$on("$routeChangeStart",function(event,next,current){if(!impetroUser().singularis && next.loadedTemplateUrl!="cera/login.html"){$location.path("/exodus");}});//redirect when not login by watching event
   var user=dynamis.get("USER_NAME",true)||{"nominis":"Firstname Lastname","Position":"Administrator","jesua":null};
   $rootScope.usr={"display":user['nominis'],"title":user['position'],"img":"images/avatar.jpg","link":"#profile/view/"+user['jesua']};
   $rootScope.crud={};
   $rootScope.PASCO=PASCO;
   $rootScope.debug=PASCO?false:false;//no mobile debug
   $rootScope.debug=(typeof chrome !== "undefined" && chrome.hasOwnProperty("app"))?false:$rootScope.debug;//no app debug
   $rootScope.debug=(user!==null&&user.operarius==="fredtma")?true:$rootScope.debug;//no app debug
   $rootScope.exit=function(){
		crud.modalMessage("Are you sure you want to exit the application?",function(selected){naviagator.app.exitApp()},function(selected){iyona.deb("The button selected is::"+selected);});
   }
}]);
configuration.prototype.eternal=function(){
   var defaultScope={
      "profile":{
         "mensa":"users",
         "creation":{"jesua":{"type":"TEXT","unique":true},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"username":{"type":"TEXT","unique":true},"firstname":{"type":"TEXT","null":true},"lastname":{"type":"TEXT"},"email":{"type":"TEXT","null":true},"password":{"type":"TEXT","null":true},"mobile":{"type":"TEXT"},"title":{"type":"TEXT"},"role":{"type":"TEXT"},"position":{"type":"TEXT"} },
         "extra":{"title":{"enum":["Mr.","Mrs.","Miss.","Doc.","Sir."]},"role":{"enum":["Project manager","Accountant","Adminstrator"]}},
         "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"firstname":null,"lastname":null,"username":null,"email":null,"mobile":null,"title":"Mr.","communication":"email","position":null},
         "list":{"jesua":null,"firstname":null,"lastname":null,"username":null,"email":null,"mobile":null},
         "menu":{
            "details":[{"text":"Administrators' List", "link":"#profile/list"},{"text":"Administrator","class":"active"}],
            "list":[{"text":"Administrators' List","class":"active"}],
            "alpha":"#profile/new"}
//        "consuetudinem":"foreign",
//        "foreignConf":{"link_users_clients":{"parent":"username","col1":"username","col2":"client_name","refField":"name","refTable":"clients","title":"Link Administrator to Clients","type":"checkbox"}}
      },
      "suppliers":{
        "mensa":"companies",
        "creation":{"jesua":{"type":"TEXT","unique":true},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"name":{"type":"TEXT","unique":true},"description":{"type":"TEXT"},"contact":{"type":"TEXT","ndx":"ndxSupplierContact"},"tel":{"type":"TEXT"},"email":{"type":"TEXT"},"category":{"type":"TEXT"},"code":{"type":"TEXT","unique":true},"provides":{"type":"TEXT"}},
        "extra":{"provides":{"set":["material","service","product"]}},
        "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"name":null,"description":null,"contact":null,"tel":null,"email":null,"category":"supplier","code":null,"provides":"material"},
        "list":{"name":{"beta":true,"alpha":null},"contact":null,"description":null},
        "menu":{
          "details":[{"text":"List of Suppliers","link":"#suppliers/list"},{"text":"Supplier","class":"active"}],
          "list":[{"text":"Suppliers' List","class":"active"}],
          "alpha":"#suppliers/new"
        },
        "consuetudinem":"list-items",
         "listsConf":{
            "banks":{
               "fields":{"supplier_name":{"alpha":null},"name":{"alpha":null},"code":{"alpha":null},"account_number":{"alpha":null},"swift":{"alpha":null}},
               "parent":"name","ref":null,"title":"Associate banks"} }
      },
      "company":{
        "mensa":"companies",
        "creation":{"jesua":{"type":"TEXT","unique":true},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"name":{"type":"TEXT","unique":true},"description":{"type":"TEXT"},"contact":{"type":"TEXT","ndx":"ndxSupplierContact"},"tel":{"type":"TEXT"},"email":{"type":"TEXT"},"category":{"type":"TEXT"},"code":{"type":"TEXT","unique":true}},
        "extra":{"category":{"enum":["company","client","supplier","vendor","shop"]}},
        "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"name":null,"desc":null,"category":"company"},
        "list":{"name":null},
        "menu":{
          "details":[{"text":"Company Details","class":"active"}],
          "list":[{"text":"Companies' List","class":"active"}],
          "alpha":"#company/new"
        }
      },
      "clients":{
        "mensa":"companies",
        "creation":{"jesua":{"type":"TEXT","unique":true},"created":{"type":"DATETIME"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"name":{"type":"TEXT","unique":true},"description":{"type":"TEXT"},"contact":{"type":"TEXT","ndx":"ndxSupplierContact"},"tel":{"type":"TEXT"},"email":{"type":"TEXT"},"category":{"type":"TEXT"},"code":{"type":"TEXT","unique":true}},
        "extra":{"category":{"enum":["company","client","supplier","vendor","shop"]}},
        "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"name":null,"desc":null,"contact":null,"tel":null,"email":null,"category":"client","code":null},
        "list":{"name":null,"contact":null,"tell":null},
        "menu":{
          "details":[{"text":"List of Clients","link":"#clients/list"},{"text":"Client","class":"active"}],
          "list":[{"text":"Clients' List","class":"active"}],
          "alpha":"#clients/new"
          }
        },
      "products":{
        "mensa":"items",
        "creation":{"jesua":{"type":"TEXT","unique":true},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"name":{"type":"TEXT","unique":true},"description":{"type":"TEXT"},"code":{"type":"TEXT","unique":true},"stdCost":{"type":"REAL"}},
        "extra":{},
        "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"name":null,"desc":null,"code":null,"stdCost":null},
        "list":{"name":null,"code":null,"stdCost":null},
        "menu":{
          "details":[{"text":"List of Products","link":"#product/list"},{"text":"Product","class":"active"}],
          "list":[{"text":"Products' List","class":"active"}],
          "alpha":"#product/new"
        }
      },
      "banks":{
        "mensa":"banks",
        "creation":{"jesua":{"type":"TEXT","unique":true},"created":{"type":"TEXT"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"name":{"type":"TEXT","ndx":"ndxBankName"},"supplier_name":{"type":"TEXT","ndx":"ndxSupplierBank"},"code":{"type":"TEXT","unique":true},"address":{"type":"TEXT"},"account_number":{"type":"TEXT","unique":true},"swift":{"type":"TEXT"},"wire_routing":{"type":"TEXT"},"aba":{"type":"TEXT"},"iban":{"type":"TEXT"},"country":{"type":"TEXT"}},
        "extra":{},
        "typeahead":{"supplier_name":{"mensa":"companies","agro":"name","index":"uniq_name"}},
        "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"name":null,"supplier_name":null,"code":null,"address":null,"account_number":null,"swift":null,"wire_routing":null,"aba":null,"iban":null,"country":null},
        "list":{"name":null,"code":null,"account_number":null,"supplier_name":null},
        "menu":{
          "details":[{"text":"List of Banks","link":"#bank/list"},{"text":"Bank","class":"active"}],
          "list":[{"text":"Banks' List","class":"active"}],
          "alpha":"#banks/new"
        }
      },
      "purchases":{
        "mensa":"purchase_orders",
        "creation":{"jesua":{"type":"TEXT"},"created":{"type":"DATETIME"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"supplier_name":{"type":"TEXT","ndx":"ndxSupName"},"project_name":{"type":"TEXT","ndx":"ndxPrjName"},"order_number":{"type":"TEXT","ndx":"ndxOrder"},"due_date":{"type":"DATETIME"},"innitiator":{"type":"TEXT"},"approver":{"type":"TEXT"},"total":{"type":"DECIMAL"}},
        "extra":{},
        "details":{"jesua":null,"created":"NOW()","modified":"NOW()","supplier_name":null,"project_name":null,"order_number":null,"due_date":null,"innitiator":null,"approver":null,"total":null},
        "list":{"project_name":null,"supplier_name":null,"order_number":null,"total":null},
        "menu":{
          "details":[{"text":"List of Purchase Orders","link":"#purchases/list"},{"text":"Purchase Order","class":"active"}],
          "list":[{"text":"List of Purchase Orders","class":"active"}],
          "alpha":"#purchases/new"
        }
      },
      "bills":{
        "mensa":"bills",
        "creation":{"jesua":{"type":"TEXT"},"created":{"type":"DATETIME"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"name":{"type":"TEXT","ndx":"ndxBillName"},"supplier_name":{"type":"TEXT","ndx":"ndxSupplierName"},"project_name":{"type":"TEXT","ndx":"ndxProjectName"},"bank_name":{"type":"TEXT","ndx":"ndxBankNameRef"},"currency":{"type":"TEXT"},"amount_due":{"type":"REAL","ndx":"ndxBillAmount"},"amount_paid":{"type":"REAL"},"due_date":{"type":"DATETIME"},"innitiator":{"type":"TEXT","ndx":"ndxBillInit"},"approver":{"type":"TEXT","ndx":"ndxBillApp"},"transaction_number":{"type":"TEXT"},"status":{"type":"TEXT"},"reference_bottom":{"type":"TEXT"}},
        "extra":{"status":{"enum":['Paid','Sent to bank','Cancel','Printed','Innitiated','Pending']},"currency":{"enum":['USD','EUR','GBP','ZAR','ANG','AKZ']}},
        "typeahead":{
           "supplier_name":{"mensa":"companies","agro":"name","index":"uniq_name"},
//           "bank_name":{"mensa":"banks","agro":"account_number","display":["supplier_name","name"],"index":"uniq_account_number"},
           "project_name":{"mensa":"projects","agro":"name","index":"uniq_name"},
           "approver":{"mensa":"users","agro":"username","display":["firstname","lastname"],"index":"uniq_username"}
        },
        "details":{"jesua":null,"created":"NOW()","modified":"NOW()","name":null,"supplier_name":null,"project_name":null,"currency":"USD","amount_due":0,"amount_paid":0,"due_date":null,"innitiator":null,"approver":null,"transaction_number":null,"status":'Pending',"reference_bottom":null},
        "list":{"name":null,"project_name":null,"supplier_name":null,"transaction_number":null,"amount_due":null,"date_due":null},
        "menu":{
          "details":[{"text":"AFP list","link":"#bills/list"},{"text":"Approval for payment","class":"active"}],
          "list":[{"text":"Approval for payments","class":"active"}],
          "alpha":"#bills/new"
        }
      },
      "projects":{
        "mensa":"projects",
        "creation":{"jesua":{"type":"TEXT","key":true},"created":{"type":"DATETIME"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"name":{"type":"TEXT","unique":true},"project_manager":{"type":"TEXT","ndx":"ndxPrjMng"},"description":{"type":"TEXT"},"start_date":{"type":"DATETIME"},"end_date":{"type":"DATETIME"}},
        "extra":{},
        "typeahead":{"project_manager":{"mensa":"users","index":"uniq_username","agro":"username","display":["firstname","lastname"]}},
        "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"name":null,"project_manager":null,"description":null,"start_date":null,"end_date":null},
        "list":{"project_manger":null,"name":null,"start_date":null,"end_date":null},
        "menu":{
          "details":[{"text":"Project List","link":"#projects/list"},{"text":"Project","class":"active"}],
          "list":[{"text":"List of Projects","class":"active"}],
          "alpha":"#projects/new"
        },
        "consuetudinem":"list-items",
        "listsConf":{
         "bills":{
            "fields":{"project_name":null,"jesua":null,"name":{"alpha":"a new AFP"},"supplier_name":{"alpha":"the supplier's name"},"amount_due":{"alpha":0},"status":{"alpha":"pending"}},
				"parent":"name","ref":null,"title":"Associate project bill"} }
      },
      "payable":{
        "mensa":"payable",
        "creation":{"jesua":{"type":"TEXT","key":true},"created":{"type":"DATETIME"},"modified":{"type":"TIMESTAMP","default":"CURRENT_TIMESTAMP"},"signature1":{"type":"TEXT"},"signature2":{"type":"TEXT"},"supervisor":{"type":"TEXT"},"accountant":{"type":"TEXT"},"reference":{"type":"TEXT","unique":true}},
        "extra":{},
        "typeahead":{
           "signature1":{"mensa":"users","index":"uniq_username","agro":"username","display":["firstname","lastname"]},
           "signature2":{"mensa":"users","index":"uniq_username","agro":"username","display":["firstname","lastname"]},
           "accountant":{"mensa":"users","index":"uniq_username","agro":"username","display":["firstname","lastname"]}
        },
        "details":{"created":"NOW()", "modified":"NOW()","jesua":null,"signature1":null,"signature2":null,"supervisor":null,"accountant":null,"reference":null},
        "list":{"created":"NOW()", "modified":"NOW()","jesua":null,"supervisor":null,"accountant":null,"reference":null},
        "menu":{
          "details":[{"text":"Petty Cash of AFP","link":"#payable/list"},{"text":"Petty Cash Report of AFP","class":"active"}],
          "list":[{"text":"List of Petty Cash Items","class":"active"}],
          "alpha":"#payable/report"
        },
        "consuetudinem":"itemsReport",
        "itemsConf":{
            "bills":{
               "fields":["payable_ref"],
               "parent":["reference"]
            }
         }
      }
   }
   dynamis.set("defaultScope",defaultScope,true);
};
(function(){var settings= new configuration(); settings.eternal();  })();