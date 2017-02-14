*** KEY FOR AQI - 8ed99be697162e1180fe56e3bd070eb1d14b5b88

$(function(){
	var apiKey = '8ed99be697162e1180fe56e3bd070eb1d14b5b88',
		apiUrl = 'https://api.waqi.info/feed/opole/?token=' + apiKey;

	function connectionToApi(){
		$.ajax({
			url: apiUrl,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			getTime(response);
		}).fail(function(error){
			console.log(error);
		})
	}
	function getTime(stationInfo){
		var time = $('.time_of_m'),
			location = $('.place'),
			span = $('<span>');
			$.each(stationInfo, function(i, v){
				span.text(stationInfo.data.city.name);
				console.log(span);
				location.append(span);
			});
		wheaterData(stationInfo);
	}
	function wheaterData(stationInfo){
		var hum = $('.humidity'),
			pres = $('.presure'),
			temp = $('.temp');
			$.each(stationInfo, function(i, v){
				temp.text('Temperatura powietrza: ' + stationInfo.data.iaqi.t.v);
				pres.text('Ciśnienie powietrza: ' + stationInfo.data.iaqi.p.v);
				hum.text('Wilgotność: ' + stationInfo.data.iaqi.h.v)
			});
		aqi(stationInfo);
	}
	function aqi(stationInfo){
		var polutionType = $('.pol'),
			polutionValue = $('.pol_val');
			$.each(stationInfo, function(i, v){
				polutionType.text('Mierzony parametr: ' + stationInfo.data.dominentpol);
				polutionValue.text('Najnowsza wartość: ' + stationInfo.data.iaqi.pm10.v + ' [µg/m3]');
			});
		checValue(stationInfo, polutionValue);
	}

	function checValue(stationInfo, polutionValue){
		var param = stationInfo.data.iaqi.pm10.v;
			if (param <= 50) {
				polutionValue.css('background-color', 'green');
			} else if (param > 51 && param <= 200) {
				polutionValue.css({ 'background-color': 'yellow', 'color': 'red' });
			} else if (param > 201){
				polutionValue.css({'background-color', 'red', 'color': 'white'});
			}
	}
	connectionToApi();
	console.log('t');
});



$(document).ready(function(){
	
});