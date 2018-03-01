var currency=['BTC','XEM','BCH','LTC','DASH','ETC','XMR','STRAT','BTS','PIVX','ZEC']
var isChromium=!!window.chrome;if(isChromium){console.log("--> isChromium YES !!! ")}else{console.log("--> isChromium NO !!! ")}
function getParameterByName(){var name="currency"
var url=window.location.href;name=name.replace(/[\[\]]/g,"\\$&");var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url);if(!results)return null;if(!results[2])return '';return decodeURIComponent(results[2].replace(/\+/g," "));}
function currencyNotSupporter(){alert('Currency not supported, we accept only: '+currency.toString())
var url=window.location.href
url=url.split(/[?#]/)[0];console.log("window.location.href",url)
window.location=url
return false;}
function checkQs(){var qs=getParameterByName()
if(qs===null){return false;}else{qs=qs.toUpperCase()
return qs}}
function hideComponentOfApp(){console.log("hideComponentOfApp");$("#appConteiner").addClass("hideParts");}
function showAppCurrency(){var qs=checkQs()
if(qs){if(!currency.includes(qs)){currencyNotSupporter();}else{$("#appConteiner_"+qs).show()
hideComponentOfApp()}}else{}
$("#appConteiner").show()
if(!isChromium){$("#appNoChromium").show()}}
$(function(){$("#backToInfo").click(function(){console.log("backToInfo")
$("#appConteiner").hide()
$("#tokenAgreement").hide()
$("#info").show()
$("#transaction-module").hide()
$.cookie("step",2);});$(".showApp").click(function(){console.log("showApp")
console.log("showApp");showAppCurrency()
$("#tokenAgreement").hide()
$("#info").hide()
$("#transaction-module").show()
$.cookie("step",3);});console.log("Step: "+$.cookie("step"))
if($.cookie("step")&&($.cookie("step")==2||$.cookie("step")==3)){console.log("----> setp 3")
$("#info").hide()
$("#tokenAgreement").hide()
$("#transaction-module").show()
showAppCurrency()}
$('input[type="checkbox"]').change(function(){var name=$(this).prop('name');var check=$(this).prop('checked');console.log("Change: "+name+" to "+check+" --> "+$(this).is(':checked'));if($('#tokenAgreementCheckNoUs').is(':checked')&&$('#tokenAgreementCheck').is(':checked')&&$('#tokenAgreementCheckWP').is(':checked')){var qs=checkQs()
if(qs){if(!currency.includes(qs)){currencyNotSupporter();}else{$("#info").hide()
$("#tokenAgreement").hide()
console.log("GO TO STEP 3 <----")
$.cookie("step",3);showAppCurrency()}}else{$("#info").hide()
$("#tokenAgreement").hide()
console.log("GO TO STEP 3 <----")
$.cookie("step",3);showAppCurrency()}}else{$("#appConteiner").hide()
$("#tokenAgreement").show()}});});