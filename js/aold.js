//*** KEY FOR AQI - 8ed99be697162e1180fe56e3bd070eb1d14b5b88

// var apiKey = '8ed99be697162e1180fe56e3bd070eb1d14b5b88',
	// 	apiUrl = `https://api.waqi.info/feed/opole/?token=${apiKey}`;
// *** KONSTRUKTORY ***
// *** *** Konstruktor połączenia *** ***
// function ConnectionConstr(apiUrl, dataType, type){
// 	this.url = apiUrl;
// 	this.dataType = dataType;
// 	this.type = type;
// }

// *** PROTOTYPY ***
// *** Prototyp połącznia *** ***
// ConnectionConstr.prototype.connection = function(){
// 	$.ajax({
// 			url: this.url, 
// 			dataType: this.dataType,
// 			type: this.type
// 		}).done(function(response){
// 			console.log(response);
// 		}).fail(function(error){
// 			console.log(error);
// 		})
// }
// var testowyUrl = `http://api.looko2.com/?method=GetLOOKO&id=5ccf7fc18200&token=${apiKey}`;
// var conToTestowy = new ConnectionConstr(testowyUrl, 'json', 'GET', 'wpis');

// conToTestowy.connection();






// function testowyNWK(response){
// 	console.log(response);
// }
// testowyNWK();

// function Polaczenie(){

// }

// Polaczenie.prototype.polacz = function(){
// 	$.ajax({
// 			url: `http://api.looko2.com/?method=GetLOOKO&id=5ccf7fc255ee&token=${apiKey}`,
// 			dataType: 'json',
// 			type: 'GET'
// 		}).done(function(response){
// 			console.log(response);
// 		}).fail(function(error){
// 			console.log(error);
// 		})
// }

// var drugaTestowa = new Polaczenie();

// drugaTestowa.polacz();

	// function getTime(stationInfo){
	// 	var date = $('.date_of_m'),
	// 		location = $('.place'),
	// 		spanCity = $('<span>'),
	// 		spanDate = $('<span>');
	// 		$.each(stationInfo, function(i, v){
	// 			spanCity.text(stationInfo.data.city.name).appendTo(location);
	// 			spanDate.text(stationInfo.data.time.s).appendTo(date);
	// 		});
	// 	wheaterData(stationInfo);
	// }
	// function wheaterData(stationInfo){
	// 	var hum = $('.humidity'),
	// 		pres = $('.presure'),
	// 		temp = $('.temp'),
	// 		spanHum = $('<span>'),
	// 		spanPres = $('<span>'),
	// 		spanTemp = $('<span>');
	// 		$.each(stationInfo, function(i, v){
	// 			spanTemp.html(`${stationInfo.data.iaqi.t.v} <span><sup>o</sup>C</span>`).appendTo(temp);
	// 			spanPres.html(`${stationInfo.data.iaqi.p.v} <span>hPa</span>`).appendTo(pres);
	// 			spanHum.text(stationInfo.data.iaqi.h.v).appendTo(hum);
	// 		});
	// 	aqi(stationInfo);
	// }
	// function aqi(stationInfo){
	// 	var polValue = $('.pol_val');
	// 		$.each(stationInfo, function(i, v){
	// 			polValue.html(`<span>${stationInfo.data.iaqi.pm10.v}<span style="font-size: 0.9rem;">𝝻g/m<sup>3</sup></span></span>`);
	// 		});
	// 	checValue(stationInfo);
	// }

	// function checValue(stationInfo){
	// 	var param = stationInfo.data.iaqi.pm10.v,
	// 		polCont = $('.polution_data'),
	// 		spanIndex = $('<span>'),
	// 		polIndex = $('.pol_index');
	// 		if (param <= 20) {
	// 			polCont.css('background-color', 'rgba(0, 176, 80, 1.0)');
	// 			 spanIndex.text('Bardzo dobry').appendTo(polIndex);
	// 		} else if (param >= 21 && param <= 60) {
	// 			polCont.css({'background-color' : 'rgba(146, 208, 80, 1.0)',
	// 						'color' : '#5e5e5e'});
	// 			 spanIndex.text('Dobry').appendTo(polIndex);
	// 		} else if (param >= 61 && param <= 100){
	// 			 polCont.css({'background-color': 'rgba(255, 255, 0, 1.0)',
	// 							'color' : '#5e5e5e'});
	// 			 spanIndex.text('Umiarkowany').appendTo(polIndex);
	// 		} else if (param >= 101 && param <= 140) {
	// 			polCont.css({'background-color' : 'rgba(255, 192, 0, 1.0)',
	// 							'color' : '#5e5e5e'});
	// 			spanIndex.text('Dostateczny').appendTo(polIndex);
	// 		} else if (param >= 141 && param <= 200){
	// 			polCont.css('background-color', 'rgba(255, 0, 0, 1.0)');
	// 			spanIndex.text('Zły').appendTo(polIndex);
	// 		} else if (param >= 201) {
	// 			polCont.css('background-color', 'rgba(192, 0, 0, 1.0)');
	// 			spanIndex.text('Bardzo zły').appendTo(polIndex);
	// 		}
	// 	owner(stationInfo);
	// }

	// function owner(stationInfo){
	// 	var owner = $('.owner'),
	// 		ownerSpan = $('<span>');
	// 		$.each(stationInfo, function(i, v){
	// 			ownerSpan.html(`<span>Źródło danych: ${stationInfo.data.attributions[0].name}`)
	// 			.appendTo(owner);
	// 		})
	// }
	// Gogole Map
// var opoleStations = {
//         grudziceStr: {
//           center: {lat: 50.6515, lng: 17.9857}
//         },
//         nowaWiesKrStr: {
//           center: {lat: 50.6533, lng: 17.9521}
//         },
//         chabryStr: {
//           center: {lat: 50.6791, lng: 17.9265}
//         },
//         pasiekaStr: {
//           center: {lat: 50.6619, lng: 17.9201}
//         },
//         pulaskiegoStr: {
//           center: {lat: 50.6733, lng: 17.925}
//         },
//         strzeleckaStr : {
//           center: {lat: 50.6711, lng: 17.9260}
//         }
//       };
     // for (var street in opoleStations) {
     //      var stationCircle = new google.maps.Circle({

     //        strokeColor: '#FF0000',
     //        strokeOpacity: 0.8,
     //        strokeWeight: 1,
     //        fillColor: 'red',
     //        fillOpacity: 0.35,
     //        map: map,
     //        center: opoleStations[street].center,
     //        radius: 400
     //      });
     //    }
     //    opoleStations.addListner('click', function(){
     //    	console.log('test');
     //    })