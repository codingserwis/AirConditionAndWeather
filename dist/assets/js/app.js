"use strict";var IJPApi=function(){var a={domStrings:{ijpData:".station__data-ijp",pm10Data:".station__data-pm1",pm25Data:".station__data-pm2",IJPDataContainer:".data__container-ijp",cond:".weather__currnet-condition",temp:".weather__currnet-temp"},ijpApi:{apiKey:"1487184056",pointsId:{chabry:"5ccf7fc18200",pulaskiego:"5ccf7fc255ee",pileckiego:"6001940094f8",pasieka:"5ccf7fc17d7d",nowaWiesKrol:"5ccf7fc18052",grudzice:"60019400a82b",osAlSolid:"a020a6036801"}},apixuApi:{apiKey:"48147044f89b4001831152133171402",location:"Opole"}},i=function(){var i=new Request("http://api.apixu.com/v1/current.json?key="+a.apixuApi.apiKey+"&q="+a.apixuApi.location,{method:"GET"});fetch(i).then(function(a){return a.json()}).then(function(a){console.log(a),t(a)})},e=function(){var i=!0,e=!1,t=void 0;try{for(var n,c=Object.values(a.ijpApi.pointsId)[Symbol.iterator]();!(i=(n=c.next()).done);i=!0){var r=n.value,d=new Request("http://api.looko2.com/?method=GetLOOKO&id="+r+"&token="+a.ijpApi.apiKey,{method:"GET"});fetch(d).then(function(a){return a.json()}).then(function(a){console.log(a),o(a)})}}catch(a){e=!0,t=a}finally{try{!i&&c.return&&c.return()}finally{if(e)throw t}}},t=function(i){var e=void 0,t=document.querySelector(a.domStrings.cond),o=document.querySelector(a.domStrings.temp).firstElementChild;e=n(i),t.innerHTML=e,o.innerHTML=i.current.temp_c},n=function(a){if(1===a.current.is_day){if(1e3===a.current.condition.code)return'<i class="wi wi-day-sunny"></i>';if(1003===a.current.condition.code)return'<i class="wi wi-day-cloudy"></i>'}else{if(1e3===a.current.condition.code)return'<i class="wi wi-night-clear"></i>';if(1003===a.current.condition.code)return'<i class="wi wi-night-alt-cloudy"></i>'}},o=function(i){var e=void 0,t=void 0,n=void 0,o=void 0,s=void 0,l=document.querySelector(a.domStrings.IJPDataContainer);t=c(i),n=r(i),o=d(i),s=_(i),e='<div class="station__container"><h2 class="station__container-header">'+t+'</h2><div class="station__container-data flex flex__row flex__justify-between"><div class="station__data-ijp '+n+'"><h3>IJP</h3><p class="data__ijp">'+i.IJP+'</p><p class="text__ijp">'+i.IJPString+'</p></div><div class="station__data-pm2 '+o+'"><h3>PM 2.5</h3><p class="data__pm2">'+i.PM25+'</p><p class="units">&microg/m<sup>3</sup></p></div><div class="station__data-pm1 '+s+'"><h3>PM 10</h3><p class="data__pm1">'+i.PM10+'</p><p class="units">&microg/m<sup>3</sup></p></div></div></div>',l.insertAdjacentHTML("beforeend",e)},c=function(a){var i=void 0;return"Opole_Opolski_Alarm_Smogowy_Grud"===a.Name?i="Grudzice":"Opole_STE_Silesia_Chabry"===a.Name?i="Osiedle Chabry":"Opole_Opolski_Alarm_Smogowy_NWK"===a.Name?i="Nowa Wieś Królewska":"Opole_Komitet_Obrony_Pasieki_Pas"===a.Name?i="Pasieka":"Opole_Liceum_NR_II_Pulaskiego3"===a.Name?i="LO nr II - Puławskiego":"Opole_Opolski_Alarm_SmogowyBuhla"===a.Name?i="Opole - Groszowice":"Opole_OAS_AlSolidarnosci"===a.Name&&(i="Aleja Solidarności"),i},r=function(a){var i=void 0;return a.IJP>=0&&a.IJP<=1?i="data__bcg-dgreen":a.IJP>=2&&a.IJP<=3?i="data__bcg-green":a.IJP>=4&&a.IJP<=5?i="data__bcg-yellow":a.IJP>=6&&a.IJP<=7?i="data__bcg-orange":a.IJP>=8&&a.IJP<=9?i="data__bcg-red":a.IJP>=10&&(i="data__bcg-black"),i},d=function(a){var i=void 0;return a.PM25>=0&&a.PM25<=12?i="data__bcg-dgreen":a.PM25>=13&&a.PM25<=36?i="data__bcg-green":a.PM25>=37&&a.PM25<=60?i="data__bcg-yellow":a.PM25>=61&&a.PM25<=84?i="data__bcg-orange":a.PM25>=85&&a.PM25<=120?i="data__bcg-red":a.PM25>121&&(i="data__bcg-black"),i},_=function(a){var i=void 0;return a.PM10>=0&&a.PM10<=20?i="data__bcg-dgreen":a.PM10>=21&&a.PM10<=60?i="data__bcg-green":a.PM10>=61&&a.PM10<=100?i="data__bcg-yellow":a.PM10>=101&&a.PM10<=140?i="data__bcg-orange":a.PM10>=141&&a.PM10<=200?pm25Bcg="data__bcg-red":a.PM10>201&&(pm25Bcg="data__bcg-black"),i};return{init:function(){console.log("app is running!"),e(),i()}}}();IJPApi.init();
//# sourceMappingURL=app.js.map
