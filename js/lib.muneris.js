window.PASCO=false;if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))window.PASCO=true;
window.PASCO = (function(a) {if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
return true;return window.PASCO;})(navigator.userAgent || navigator.vendor || window.opera);
//============================================================================//LOGGER
iyona={
   view:true,
   enableLog:true,
   pop:console.log,
   pup:function(){var isChrome = navigator.userAgent.indexOf("Chrome") !== -1;if(isChrome){var stack = new Error().stack; var file = stack.split("\n")[3].split("/"); return '('+file[file.length-1]+')';}else{return ''}},
   obj:function(arg){
      var first="",obj,x,l=arg.length;
      if(l>1)first=arg[0];
      for(x=0;x<l;x++){obj=arg[x];
         if(typeof obj=="undefined"||arg==null){console.log("<null>");}
         else if(typeof obj!="object"){console.log(obj);}
         else {for(var key in obj){if(typeof obj[key]=="object") this.obj(obj[key]); else console.log(key+'='+obj[key]);} }
      }
   },
   see:function(){
      var l=arguments.length,variable;
      for(var x=0;x<l;x++){variable=typeof arguments[x]==="function"?encodeURI(arguments[x].toString()):arguments[x];console.log(variable);}},/*gap or worker display without iteration*/
   dir:function(){
      var l=arguments.length;
      for(var x=0;x<l;x++){
         if(typeof arguments[x]==="function")console.log(encodeURI(arguments[x].toString()));
         else if (typeof arguments[x]==="object") {for (var index in arguments[x]); console.log(arguments[x][index])}
         else console.log(arguments[x]);}},/*for workers or gap application display objects*/
   log:function(){if(iyona.enableLog){if(arguments[1]!==false)console.log('%c'+arguments[0],'background:#2d79aa;color:#d9edf7;width:100%;display:block;font-weight:bold;',arguments); else console.log('%c'+arguments[0],'background:#ff0000;color:#d9edf7;width:100%;display:block;font-weight:bold;',arguments);}},/*notification msg for the log and all set var*/
   msg:function(msg,permanent,clss,opt){if(iyona.view){console.log(arguments);clss=clss||'';_$("#notification span").html(msg).removeClass().addClass('blink_me '+clss);if(permanent!==true)setTimeout(function(){_$("#notification span").html("...").removeClass('blink_me');},5000); }},/*debug msg and all set var*/
   deb:function(){if(iyona.view){if(!PASCO){arguments[arguments.length++]=this.pup();this.pop.apply(console,arguments);}else{this.obj(arguments);} }}/*break down all set var into arr, custom debug msg re-created*/
}
//============================================================================//STORAGE
dynamis={
   set:function(_key,_value,_local){
      var set={},string;set[_key]=_value;string=JSON.stringify(_value);
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local==true){chrome.storage.local.set(set);sessionStorage.setItem(_key,string);}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.set(set);sessionStorage.setItem(_key,string);}
      else if(_local==true){localStorage.setItem(_key,string);}
      else{sessionStorage.setItem(_key,string);}//endif
   },
   get:function(_key,_local){
      var value;
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local==true){chrome.storage.local.get(_key,function(obj){return obj[_key]});return sessionStorage.getItem(_key);}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.get(_key,function(obj){return obj[_key]});return sessionStorage.getItem(_key);}
      else if(_local==true){value=localStorage.getItem(_key);return (value&&value.indexOf("{")!=-1)?JSON.parse(value):value;}
      else{value=sessionStorage.getItem(_key);return (value&&value.indexOf("{")!=-1)?JSON.parse(value):value;}//endif
   },
   del:function(_key,_local){
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local==true){chrome.storage.local.remove(_key);sessionStorage.removeItem(_key);}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.remove(_key);sessionStorage.removeItem(_key);}
      else if(_local==true){localStorage.removeItem(_key);}
      else{sessionStorage.removeItem(_key);}//endif
   },
   clear:function(_local){
      if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&_local==true){chrome.storage.local.clear();}
      else if(typeof chrome!=="undefined"&&chrome.hasOwnProperty("storage")&&!_local){chrome.storage.sync.clear();}
      else if(_local==true){localStorage.clear();}
      else{sessionStorage.clear();}//endif
   }
}

//============================================================================//CONFIG
function configuration(){this.testing=true;}
configuration.prototype.config=function(){
   sessionStorage.startTime=new Date().getTime();
   sessionStorage.runTime=new Date().getTime();
   sessionStorage.SITE_NAME="Exchange Aurora Aura";
   sessionStorage.SITE_DATE='fullDate';
   sessionStorage.SITE_TIME='mediumTime';
   sessionStorage.SITE_URL='http://www.iyona.co.za/servers/rastaa/';
   sessionStorage.SITE_SERVICE=sessionStorage.SITE_URL+'inc/services.php';
   sessionStorage.SITE_MILITIA=sessionStorage.SITE_URL+'inc/notitia.php';
   sessionStorage.SITE_UPLOADS=sessionStorage.SITE_URL+'uploads/';
   sessionStorage.MAIL_SUPPORT='fredtma@gmail.com';
   sessionStorage.DB_NAME='rastaa';
   sessionStorage.DB_VERSION=4;//always integer 4 iDB
   sessionStorage.DB_DESC='The local application Database';
   sessionStorage.DB_SIZE=15;
   sessionStorage.DB_LIMIT=20;
   dynamis.set("CONFIG",{"localStorage":window.hasOwnProperty('localStorage'),
      "sessionStorage":window.hasOwnProperty('sessionStorage'),
      "Worker":window.hasOwnProperty('Worker'),
      "openDatabase":"openDatabase" in window,
      "indexedDB":"indexedDB" in window||"webkitIndexedDB" in window||"mozIndexedDB" in window||"msIndexedDB" in window,
      "WebSocket":window.hasOwnProperty('WebSocket'),
      "history":window.hasOwnProperty('history'),
      "formValidation":hasFormValidation(),
      "PASCO":window.PASCO,
      "isOnline":navigator.onLine,
      "Online":true,
      "projectID":"17238315752"
   });
   dynamis.set("EXEMPLAR",JSON.stringify({"username":["^[A-Za-z0-9_]{6,15}$","requires at least six alpha-numerique character"],
   "pass1":["((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})","requires complex phrase with upperCase, lowerCase, number and a minimum of 6 chars"],
   "pass2":["^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$","requires complex phrase with upperCase, lowerCase, number and a minimum of 6 chars"],
   "password":["(?=^.{6,}$)((?=.*[0-9])|(?=.*[^A-Za-z0-9]+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$","requires upperCase, lowerCase, number and a minimum of 6 chars"],
   "pass3":["^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$","requires upperCase, lowerCase, number and a minimum of 6 chars"],
   "fullDate":["(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))","follow the following date format (YYYY-MM-DD)"],
   "phone":["[\(]?[0-9]{3}[\)]?[\-|\ ]?[0-9]{3}[\-|\ ]?[0-9]{4}","follow the format of 011-222-3333"],
   "minMax":["[a-zA-Z0-9]{4,8}","requires at least four to eight character"],
   "number":["[-+]?[0-9]*[.,]?[0-9]+","requires a numberic value"],
   "url":["^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$","requires a valid URL"],
   "colour":["^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$","requires a valid colour in the form of (#ccc or #cccccc)"],
   "bool":["^1|0","requires a boolean value of 0 or 1"],
   "email":["^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$","the email address is not the right formated"],
   "single":["^[a-zA-Z0-9]","requires a single value"]}));
   var config = dynamis.get("CONFIG"); config.openDatabase=false;config.indexedDB=false;dynamis.set("CONFIG",config);
return this;
};
(function(){var settings= new configuration(); iyona.deb(settings,'settings');settings.config(); })();
//============================================================================//INNITIATOR
_$=function(element){return angular.element(document.querySelectorAll(element));}
//============================================================================//
function aSync(options,data,callback){//www, var, object, method, format, call_success
   var settings={"method":"post","format":"json","www":dynamis.get("SITE_SERVICE")},params;
   if(typeof options === "object")for(var att in options)settings[att]=options[att];
   else {settings.www=options;settings.var=data;settings.callback=callback;}

   var xhr=new XMLHttpRequest();
   xhr.responseType=settings.format;
   xhr.open(settings.method,settings.www,true);
   xhr.onreadystatechange=function(e){
      if(this.readyState==4 && this.status==200){
         var response=this.response||"{}";//@fix:empty object so as to not cause an error
         if(typeof response==="string"&&settings.format==="json")response=JSON.parse(response);//wen setting responseType to json does not work
         if(typeof settings.callback==="function")settings.callback(response);
      }
   }
   if(settings.var&&typeof settings.var==="object") {
//      var params=new FormData();for (var key in settings.var)params.append(key,settings.var[key]);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      params=JSON.stringify(settings.var);
   }else{
      params=settings.var;
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
//      xhr.setRequestHeader("Content-length", params.length);xhr.setRequestHeader("Connection","close");
   }
   xhr.onerror=function(e){e;}
   xhr.send(params);
}
//============================================================================//
/**
 * load a script dynamically in the header tag
 * @author fredtma
 * @version 1.2
 * @category dynamic, script
 * @param string <var>url</var> the path of the script to be loaded
 * @param string <var>sync</var> load the script with async option on
 * @return void
 */
function load_async(url,sync,position,fons){
   var s,ele,c;
   var script=document.createElement('script');
   s=document.querySelector('script[data-fons]');
   c=document.querySelector('script[src="'+url+'"]');
   if(c)return false;
   if(!position)ele=document.getElementsByTagName('head')[0];
   else if(position==='end')ele=document.getElementsByTagName('body')[0];

   if(s)$(s).remove();//ele.removeChild(s);
   if (sync !== false) script.async = true;
   script.src  = url;script.type="text/javascript";
   if(fons){script.setAttribute('data-fons',fons);}
   script.onreadystatechange = function(){iyona.log("Loaded script "+url)};
   script.onload = function(){iyona.log("Loaded script "+url)};;
   ele.appendChild(script);
   return true;
//   head.parentNode.insertBefore(script, head);
}
//============================================================================//
/**
 * similar to PHP issset function, it will test if a variable is empty
 * @author fredtma
 * @version 0.8
 * @category variable
 * @return bool
 */
function isset() {
   var a=arguments;
   var l=a.length;
   var i=0;

   if (l==0) {
      throw new Error('Empty isset');
   }//end if

   while (i!=l) {
      if (typeof(a[i])=='undefined' || a[i]===null) {
         return false;
      } else {
         i++;
      }//endif
   }
   return true;
}//end function
//============================================================================//
/**
 * get the size of an object
 *
 * It will verify all the variable sent to the function
 * @author tomwrong
 * @category object,size
 * @see http://stackoverflow.com/questions/1248302/javascript-object-size
 * @return bytes
 */
function objectSize( object ) {
    var objectList=[];var stack=[object];var bytes=0; var cnt=0; var i;
    while ( stack.length ) {
        var value = stack.pop();
        if ( typeof value === 'boolean') {bytes += 4;}
        else if(typeof value === 'string') {bytes += value.length * 2;}
        else if(typeof value === 'number') {bytes += 8;}
        else if(typeof value === 'object'&& objectList.indexOf( value ) === -1)
        {objectList.push( value );for( i in value ){stack.push( value[ i ] );cnt++;if(cnt>500)return bytes;}}
    }
    return bytes;
}
//============================================================================//
/**
 * measure two time frame from the begining of the script TimeElapse
 * for the current script TimeFrame
 * @author fredtma
 * @version 0.8
 * @category performance
 */
function timeFrame(_from,_total){
   var endTime,from,elapse;
   endTime=new Date().getTime();
   from=endTime-sessionStorage.runTime;
   elapse=endTime-sessionStorage.startTime;
   iyona.log('TimeFrame:'+_from+' '+from);
   if(_total)iyona.log('TimeElapse:'+_from+' '+elapse);
   sessionStorage.runTime=endTime;
}
//============================================================================//
/**
 * used in a similar way as the php version of ucwordsn
 * @author fredtma
 * @version 0.2
 * @category string
 * @param string <var>str</var> is the string that will be converted
 * @see PHP ucwords
 * @return string
 */
ucwords = function (str)
{
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}//end function
//============================================================================//
/**
 * change into alpha numerical, with no spacing
 * @author fredtma
 * @version 0.3
 * @category string
 * @param string <var>the_str</var> the input string to be changed
 * @param boolean <var>transform</var> choses to make it upper case or not
 * @see ucwords
 * @return string
 */
alphaNumeric = function(the_str,transform)
{
   the_str   = the_str.toLowerCase();
   the_str   = (transform)?ucwords(the_str.toLowerCase()): the_str;
   the_str   = the_str.replace(/[^A-Za-z0-9\s]*/ig,'');
   return the_str;
}
//============================================================================//
/**
 * reset a form input data
 * @author fredtma
 * @version 2.5
 * @category form, reset
 * @param object <var>_frm</var> the object representing the form
 */
function resetForm(_frm){
   $(':input',_frm).not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');$('textarea',_frm).val('');
   $('input[type=checkbox],input[type=radio]',_frm).prop('checked',false).prop('selected',false);
   $('button[type=button]',_frm).removeClass('active');
}
//============================================================================//
impetroUser=function(){
   var USER_NAME=dynamis.get("USER_NAME",true)?dynamis.get("USER_NAME",true):(dynamis.get("USER_NAME"))?dynamis.get("USER_NAME"):false;
   return USER_NAME;
}
//============================================================================//
/**
 * places the screen in fullscreen
 * @author fredtma
 * @version 1.8
 * @category feature
 */
enableFullScreen=function(elem){
   elem=elem||'fullBody';
   elem=document.getElementById(elem);
   if(elem.webkitRequestFullscreen){iyona.log('webKit FullScreen');elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);}
   else if(elem.mozRequestFullScreen){iyona.log('moz FullScreen');elem.mozRequestFullScreen();}
   else if(elem.requestFullscreen) {iyona.log('FullScreen');elem.requestFullscreen();}
   var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;//the element in fullscreen
   var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;//is the view in fullscreen?
}
//============================================================================//
/**
 * removes the full screen feature
 * @author fredtma
 * @version 1.9
 * @category fullscreen, features
 */
exitFullScreen=function(){
   if(document.cancelFullScreen)document.cancelFullScreen();else if(document.mozCancelFullScreen)document.mozCancelFullScreen();else if(document.webkitCancelFullScreen)document.webkitCancelFullScreen();
   var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;//is the view in fullscreen?
   if(fullscreenEnabled){if(document.webkitExitFullscreen)document.webkitExitFullscreen();else if(document.mozCancelFullscreen)document.mozCancelFullscreen();else if(document.exitFullscreen)document.exitFullscreen();}
}
//============================================================================//
/**
 * used to measure script execution time
 *
 * It will verify all the variable sent to the function
 * @author fredtma
 * @version 0.5
 * @category iyona
 * @gloabl aboject $db
 * @param array $__theValue is the variable taken in to clean <var>$__theValue</var>
 * @see get_rich_custom_fields(), $iyona
 * @return void|bool
 * @todo finish the function on this page
 * @uses file|element|class|variable|function|
 */
function recHistory(_mensa,_mensula,_script,_tab,_formType,_page){
   var narro={};
   //prepare l'object puor ecrire l'histoire
   if(sessionStorage.narro) narro = JSON.parse(sessionStorage.narro);//si il ya rien dans l'objet d'histoire
   var mensa=(_formType)?_mensa:false;//to prevent the lost of the original file
   _mensa=(_formType)?_mensa+"_"+_formType:_mensa;//This will change the key value if a formType is included
   narro[_mensa]={"table":_mensula,"manus":_script,"tab":_tab,"type":_formType,"page":_page,"store":mensa};//ajoute une nouvelle histoire
   sessionStorage.narro=JSON.stringify(narro);
   history.pushState({path:_mensa},_mensula);
//   iyona.log(sessionStorage.narro,'sessionStorage.narro',narro);
}
//============================================================================//
/**
 * enables the tooltip help function
 * @author fredtma
 * @version 2.3
 * @category help
 * @return void
 * @todo retrieve data from the db.
 */
helpfullLink=function(_now,_curr){
   var alpha=$("#nav-main .active").attr("id");var encore='',def;
   var openForm=document.querySelector(".accordion-body.in form");
//   var collapse=$(".collapse").length;
//   if(collapse)$(".collapse").css({"overflow":"inherit"});
   if(openForm)alpha="form";
   if(typeof _now==="object"){
      switch(alpha){
         case "nav_dealers":if($(".invHead").length)_now=".invHead"; else _now="#"+alpha;break;
         case "nav_salesman":case "nav_customers":case "nav_insurance":_now="#"+alpha;break;
         case "form":_now=openForm.id.search(/#/ig)!=-1?openForm.id:'#'+openForm.id;encore=' legend';break;
         case "nav_system":_now=".setSystem";break;default:_now="#notice6";break;}//end switch
   }//endif
//   iyona.deb(alpha,'tab',_now,"/",_curr,$(_now),'/',$(_now)[0]);
   if(_curr)$(_curr).popover('destroy');
   $DB("SELECT title,content,option,position FROM pages WHERE selector=?",[_now],"",function(r,j){
      _now+=encore;//var collapse=$(".collapse").length;
      if(j.rows.length){
         var row=j[0];var content=row['content'];var title=row['title'];var next=row['option'];var pos=row['position'];
         var link="<div class='pager small'><ul><li class='previous'><a href='javascript:void(0)' onclick='javascript:$(\""+_now+"\").popover(\"destroy\");' >Close</a></li>";
         if(next!=='none'&&!def)link+="<li class='next'><a href='javascript:void(0)' onclick='helpfullLink(\""+next+"\",\""+_now+"\")' >Next »</a></li></ul></div>";
         else if(def)link+="<li class='next'><a href='javascript:void(0)' onclick='helpfullLink(\""+def+"\",\""+_now+"\")' >Next »</a></li></ul></div>";
         iyona.deb(_now,"_now",$(_now)[0]);
         content=content+link;var len=$(_now).length;if(len>1)_now=$(_now)[0];
         iyona.deb(_now,"_now",$(_now));
         //if(collapse&&!$(_now).length)$(".collapse").css({"overflow":"hidden"});
         $(_now).first().popover({"html":true,"trigger":"click","title":title,"content":content,"placement":pos});$(_now).popover('show');
      }
   });
}
//============================================================================//
/**
 * closes one helper and opens the next
 * @author fredtma
 * @version 3.6
 * @category references
 * @param object <var>_now</var> the current helper
 * @param object <var>_next</var> the next hint object
 */
helpfullNext=function(_now,_next){
   var next="<br/><a href='javascript:void(0)' class='helpNext' onclick='helpfullNext(\'\')' >Next >></a>";
   var content=$(_next).data('content')+next;
   $(_now).popover('destroy');
   $(_next).popover({"html":true,"trigger":"click","content":content});$(_next).popover('show');
}
//============================================================================//
/**
 * check if the browser supports html5 validation
 * @author fredtma
 * @version 2.1
 * @category validation,form
 * @return bool
 */
function hasFormValidation() {
    return (typeof document.createElement( 'input' ).checkValidity == 'function');
};
//============================================================================//
/**
 * places the session current active json setting in a variable
 * @author fredtma
 * @version 2.8
 * @category json
 */
eternalCall=function(){
   if(sessionStorage.active)return JSON.parse(sessionStorage.active);else return false;
}
//============================================================================//
/**
 * set to check the client's DB to the current DB
 * The function will query the server and ask all the changes made since the users current DB
 * @author fredtma
 * @version 1.7
 * @category verision control
 * @param {real} <var>cur</var> the current version of the db
 * @param {object} <var>rev</var> the object containing the version and revision of the new version
 */
function version_db(cur,rev,trans){
   get_ajax(dynamis.get("SITE_SERVICE",true),{"militia":"verto","cur":cur,"ver":rev.ver,"revision":rev.revision},"","post","json",function(content){
      iyona.deb(content,"/\\",typeof content,"||\/",trans);
      db.transaction(function(trans){trans.executeSql("INSERT INTO version_db (ver)VALUES(?)",[rev.ver]);});
      if(typeof content==="object")SET_DB(content);
   });
}
//============================================================================//
/**
 * the return value of the worker.
 * @author fredtma
 * @version 3.1
 * @category worker
 * @param object <var>notitiaWorker</var> the worket object
 */
function readWorker(notitiaWorker){
   notitiaWorker.addEventListener('message',function(e){
      iyona.log('Worker on Notitia:', e.data);
      if(e.data=="licentia")licentia();
      if(e.data=="reset progress"){profectus("starting db reset",true,10);}
      if(e.data.progress==true){profectus(e.data.resetTable);}
   },false);
   notitiaWorker.addEventListener('error',onError,false)
}
//============================================================================//
/**
 * showrcut to make a call to the worker
 * @author fredtma
 * @version 3.2
 * @category worker, background
 * @param object <var>option</var> the option to be passed to the worker
 * @return void
 */
function callWorker(option){
   var opt=$.extend({},{"procus":impetroUser().singularis,"moli":moli},option);
   if(window.Worker&&impetroUser()){
      var notitiaWorker=new Worker("js/bibliotheca/worker.notitia.js");
      var moli=screen.height*screen.width;notitiaWorker.postMessage(opt);
      readWorker(notitiaWorker);
   }
}
//=============================================================================//
function cacheStatus(){
   var appCache = window.applicationCache;
   var sideNotice = document.getElementById('sideNotice');
   if (!appCache) return false;
   appCache.onchecking = function(e) {sideNotice.innerHTML = "<div id='note0'>Checking for a new version of the application.</div>";};
   appCache.ondownloading = function(e) {sideNotice.innerHTML += "<div id='note1'>Downloading a new offline version of the application</div>";};
   appCache.onprogress = function(e) {if (e.lengthComputable) {document.getElementById('progressBar').value = Math.round(e.loaded / e.total * 100);}};
   appCache.oncached = function(e) {sideNotice.innerHTML += "<div id='note3'>Application is available offline/cached</div>";};
   appCache.onnoupdate = function(e) {sideNotice.innerHTML += "<div id='note4'>The application is also available offline.</div>";};
   appCache.onobsolete = function(e) {sideNotice.innerHTML += "<div id='note5'>The application can not be updated, no manifest file was found.</div>";};
   appCache.onerror = function(e) {sideNotice.innerHTML += "<div id='note6'>Offline version of the application not available.</div>";};
   appCache.onupdateready = function(e) {//@todo:promt user to reload
      if (window.applicationCache.status == window.applicationCache.UPDATEREADY && true) {window.applicationCache.swapCache();window.location.reload();}
      sideNotice.innerHTML += "<div id='note7'>Application update ready</div>";
   };
}
//============================================================================//
/**
 * used to measure script execution time
 *
 * It will verify all the variable sent to the function
 * @author fredtma
 * @version 0.5
 * @category iyona
 * @gloabl aboject $db
 * @param array $__theValue is the variable taken in to clean <var>$__theValue</var>
 * @see get_rich_custom_fields(), $iyona
 * @return void|bool
 * @todo finish the function on this page
 * @uses file|element|class|variable|function|
 */
function isOnline(_display){
   var myAppCache = window.applicationCache; var note;

   var msg=navigator.onLine?"Status: Working <strong class='text-success'>Online</strong>":"Status: Working <strong class='txt-error'>Offline</strong>";
   switch (myAppCache.status) {
      case myAppCache.UNCACHED:msg+=', CACHE::UNCACHED'; break;//status 0 no cache exist
      case myAppCache.IDLE:msg+=', CACHE::IDLE'; break;//status 1 most common, all uptodate
      case myAppCache.CHECKING:msg+=', CACHE::CHECKING';break;//status 2 browser reading manifest
      case myAppCache.DOWNLOADING:msg+=', CACHE::DOWNLOADING';break;//status 3 new or updated resource dwlding
      case myAppCache.UPDATEREADY:msg+=', CACHE::UPDATEREADY';break;//status 4 file has been updated
      case myAppCache.OBSOLETE:msg+=', CACHE::OBSOLETE';break;//status 5 missing manifest, re dwld
      default: msg+=', CACHE::UKNOWN CACHE STATUS';break;
    };
   $('#statusbar').html(msg);
   if(_display===true){
      note=window.hasOwnProperty('localStorage')?"<ouput id='notice1'>Local <strong class='text-success'>Storage</strong> enabled.</ouput>":"<ouput id='notice1'>No Local <strong class='text-error'>Storage</strong></ouput>";
      note+=window.sessionStorage?"<ouput id='notice2'>Session <strong class='text-success'>Storage</strong> enabled.</ouput>":"<ouput id='notice2'>No Session <strong class='text-error'>Storage</strong></ouput>";
      note+=window.Worker?"<ouput id='notice3'>Multy threading <strong class='text-success'>Worker</strong> enabled.</ouput>":"<ouput id='notice2'>No support for <strong class='text-error'>Multy threading </strong></ouput>";
      note+=window.openDatabase?"<ouput id='notice4'> <strong class='text-success'>WebSql</strong> enabled.</ouput>":"<ouput id='notice2'>No <strong class='text-error'>WebSql</strong></ouput>";
      note+=window.WebSocket?"<ouput id='notice5'> <strong class='text-success'>WebSocket</strong> enabled.</ouput>":"<ouput id='notice2'>No <strong class='text-error'>WebSocket</strong></ouput>";
      note+=window.history?"<ouput id='notice6'> <strong class='text-success'>History</strong> enabled.</ouput>":"<ouput id='notice2'><strong class='text-error'>History</strong> not available</ouput>";
      $('#sideNotice').append(note);
   }
}
//============================================================================//
/**
 * cette fonction et utiliser pour cree les donner a envoyer dans la DB
 * @author fredtma
 * @version 2.3
 * @category database, query
 * @param array </var>theValue</var> the desc Comment
 * @return object
 */
function setQuaerere(mensa,res,tau,consuetudinem) {
    var procus=impetroUser(),moli=screen.height*screen.width,cons=consuetudinem||0;
    var quaerere=JSON.stringify({"eternal":res,"Tau":tau,"mensa":mensa,"procus":procus.jesua||0,"moli":moli,"consuetudinem":consuetudinem||0,"cons":procus.cons||0});
    dynamis.set("quaerere",quaerere,true);
    return quaerere;
}
//=============================================================================//
function checkConnection() {
   var networkState = navigator.network.connection.type||navigator.connection.type;

   var states = {};
   states[Connection.UNKNOWN] = 'an Unknown connection';
   states[Connection.ETHERNET] = 'an Ethernet connection';
   states[Connection.WIFI] = 'a WiFi connection';
   states[Connection.CELL_2G] = 'a Cell 2G connection';
   states[Connection.CELL_3G] = 'a Cell 3G connection';
   states[Connection.CELL_4G] = 'a Cell 4G connection';
   states[Connection.NONE] = 'with No network connection';
   return Array('Connection type is ' + states[networkState],networkState);
}
//============================================================================//
/**
 * calculate the date difference and returns the value in human language.
 * @author fredtma
 * @version 0.5
 * @category iyona
 * @param array </var>Comment</var> the desc
 * @see get_rich_custom_fields(), $iyona
 * @return void|bool
 * @todo finish the function on this page
 * @uses file|element|class|variable|function|
 */
function timeDifference(t) {
    var day=1000*60*60*24,hour=1000*60*60,minute=1000*60,cur=new Date().getTime(),dif,set;
    var time = new Date(t).getTime();dif=(cur-time);
    var minutes = Math.ceil(dif/minute);
    if( minutes < 2) set=Math.ceil(dif/1000)+' Second';
    else if(minutes < 60) set=minutes+' minute';
    else if(minutes < 60*24) set=Math.ceil(dif/hour)+' hour';
    else set=Math.ceil(dif/day)+' day';
    if(dif>1)set+='s';
    return set;
}
//============================================================================//
/**
 * check the users permission
 * @author fredtma
 * @version 5.9
 * @category permission
 * @param string <var>perm</var> the permission
 * @return object
 */
function getLicentia(perm) {
   return impetroUser().licencia;
}
