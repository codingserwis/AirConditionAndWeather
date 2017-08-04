// *** KEY TO LOOKO2 API - 1487184056 ***
// *** ChabryId = '5ccf7fc18200',
// *** Puławskiego = '5ccf7fc255ee',
// *** Pileckiego = '6001940094f8',
// *** Pasieka = '5ccf7fc17d7d',
// *** Nowa Wieś Królewska = '5ccf7fc18052',
// *** Grudzice = '60019400a82b',
// *** KEY TO APIXU WEATHER - 48147044f89b4001831152133171402 ***
// *** BASIC URL TO API - http://api.looko2.com/?method=GetLOOKO&id=${stationID}&token=${apiKey}
var lookoApiKey = '1487184056',

	chabryId = '5ccf7fc18200',
	pulaId = '5ccf7fc255ee',
	pilId = '6001940094f8',
	pasId = '5ccf7fc17d7d',
	nwkId = '5ccf7fc18052',
	gruId = '60019400a82b',
	apixuKey = '48147044f89b4001831152133171402',
	apixuUrl = 'http://api.apixu.com/v1/current.json?key=48147044f89b4001831152133171402&q=Opole';

var points = [
	{
		id: '#chab',
		kei: '5ccf7fc18200'
	},
	{
		id: '#pul',
		kei: '5ccf7fc255ee'
	},
	{
		id: '#pil',
		kei: '6001940094f8'
	},
	{
		id: '#pas',
		kei: '5ccf7fc17d7d',
	},
	{
		id: '#nwk',
		kei: '5ccf7fc18052'
	},
	{
		id: '#gru',
		kei: '60019400a82b'
	}
];

function connectToApi(){
	points.forEach(function(index, value){
		$.ajax({
			url: `http://api.looko2.com/?method=GetLOOKO&id=${index.kei}&token=${lookoApiKey}`,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			insertData(response, index.id);
		}).fail(function(error){
			console.log(error);
		});
	});
}
// *** Połączenie do APIXU API ***
	function connectionToApixu(){
		$.ajax({
			url: apixuUrl,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			insertWeatherData(response);
		}).fail(function(error){
			console.log(error);
		})
	}
// *** Sprawdzanie warunków pogodowych ***
	function checkWeatherCondition(response){
		if (response.current.is_day === 1){
			if(response.current.condition.code === 1000){
				return '<i class="wi wi-day-sunny"></i>';
			} else if(response.current.condition.code === 1003){
				return '<i class="wi wi-day-cloudy"></i>';
			} else if(response.current.condition.code === 1006){
				return '<i class="wi wi-day-cloudy"></i>';
			}
		} else {
			if(response.current.condition.code === 1000){
				return '<i class="wi wi-night-clear"></i>';
			} else if(response.current.condition.code === 1003){
				return '<i class="wi wi-night-alt-cloudy"></i>';
			} else if(response.current.condition.code === 1006){
				return '<i class="wi wi-night-alt-cloudy"></i>';
			} else if (response.current.condition.code === 1183){
				return '<i class="wi wi-night-alt-hail"></i>';
			}
		}	
	}

// *** Dane pogodowe ***
	function insertWeatherData(response){
		var windDir = response.current.wind_dir.toLowerCase(),
			wCondition = $('.act_condition'),
			wTemp = $('.act_temp'),
			wWindSpeed = $('.w_wind_speed'),
			wWindDir = $('.w_wind_dir'),
			wPresure = $('.w_presure'),
			wPrecipMm = $('.w_precip_mm'),
			wHumidity = $('.w_humidity'),
			wFeels = $('.w_feels'),
			wVis = $('.w_vis');

			wCondition.html(checkWeatherCondition(response));
			wTemp.html(`<p>${response.current.temp_c}&ordmC</p>`);
			wWindDir.html(`<i class="wi wi-wind wi-from-${windDir}"></i>`);
			wWindSpeed.html(`<span>${response.current.wind_kph} km/h</span>`);
			wPresure.html(`<span>Ciśniene: ${response.current.pressure_mb} mb</span>`);
			wPrecipMm.html(`<span>Ilosc opadów: ${response.current.precip_mm} mm</span>`);
			wHumidity.html(`<span>Wilgotność: ${response.current.humidity} %</span>`);
			wFeels.html(`<span>Temp. odczuwalna: ${response.current.feelslike_c} &ordmC</span>`);
			wVis.html(`<span>Widoczność: ${response.current.vis_km} km</span>`);
	}
// *** Sprawdzanie poziomu IJP
	function checkValueOfIjp(paramName, elemId){
			if(paramName >= 0 && paramName <= 1){
				elemId.css('background-color', '#1b5e20');
			} else if(paramName >= 2 && paramName <= 3){
				elemId.css('background-color', '#8bc34a');
			} else if(paramName >= 4 && paramName <= 5){
				elemId.css('background-color', '#fdd835');
			} else if(paramName >= 6 && paramName <= 7){
				elemId.css('background-color', '#bf360c');
			} else if(paramName >= 8 && paramName <= 9){
				elemId.css('background-color', '#b71c1c');
			} else if(paramName >= 10){
				elemId.css('background-color', '#000');
			}
	}
	function checkValueOfPm2(paramName, elemId){
		if(paramName >= 0 && paramName <= 12){
				elemId.css('background-color', '#1b5e20');
			} else if(paramName >= 13 && paramName <= 36){
				elemId.css('background-color', '#8bc34a');
			} else if(paramName >= 37 && paramName <= 60){
				elemId.css('background-color', '#fdd835');
			} else if(paramName >= 61 && paramName <= 84){
				elemId.css('background-color', '#bf360c');
			} else if(paramName >= 85 && paramName <= 120){
				elemId.css('background-color', '#b71c1c');
			} else if(paramName > 121){
				elemId.css('background-color', '#000');
			}
	}		
	function checkValueOfPm10(paramName, elemId){
		if(paramName >= 0 && paramName <= 20){
				elemId.css('background-color', '#1b5e20');
			} else if(paramName >= 21 && paramName <= 60){
				elemId.css('background-color', '#8bc34a');
			} else if(paramName >= 61 && paramName <= 100){
				elemId.css('background-color', '#fdd835');
			} else if(paramName >= 101 && paramName <= 140){
				elemId.css('background-color', '#bf360c');
			} else if(paramName >= 141 && paramName <= 200){
				elemId.css('background-color', '#b71c1c');
			} else if(paramName > 201){
				elemId.css('background-color', '#000');
			}
	}	

// *** Wstawianie danych ***
	function insertData(response, stId){
		var stationIjp = $(`${stId}`).find('.ijp_data'),
			stationPm25 = $(`${stId}`).find('.pm25_data'),
			stationPm10 = $(`${stId}`).find('.pm10_data');

			stationIjp.html(`<h3>IJP</h3><p class="ijp">${response.IJP}</p>`);
			stationPm25.html(`<h3>PM 2.5</h3><p>${response.PM25}</p><p class="units">&microg/m<sup>3</sup></p>`);
			stationPm10.html(`<h3>PM 10</h3><p>${response.PM10}</p><p class="units">&microg/m<sup>3</sup></p>`);

			checkValueOfIjp(response.IJP, stationIjp);
			checkValueOfPm2(response.PM25, stationPm25);
			checkValueOfPm10(response.PM10, stationPm10);

	}
// *** Akcje na doomie ***
// *** Document listner ***
$(document).ready(function(){
	// *** Wywołanie funkcji ***
	connectToApi();
	connectionToApixu();
});

// *** Mapa Google ***
var chabryStr = {
		center: {
			lat: 50.6791, 
			lng: 17.9265
		}
	},
	pulawskiegoStr = {center: {lat: 50.6733, lng: 17.925}},
	pasiekaStr = {center: {lat: 50.6619, lng: 17.9201}},
	nowaWkStr = {center: {lat: 50.6533, lng: 17.9521}},
	grudziceStr = {center: {lat: 50.6515, lng: 17.9857}},
	strzeleckaStr = {center: {lat: 50.6711, lng: 17.9260}}; 
// *** Inicjalizacja Mapy Google ***
function initMap() {
    var uluru = {lat: 50.6705469, lng: 17.8830356};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru,
    disableDefaultUI: true,
    });

// *** Punktuy pomiarowe na mapie ***
		


    	var chabryCircle = new google.maps.Circle({
    		strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: 'red',
            fillOpacity: 0.35,
            map: map,
            center: chabryStr.center,
            radius: 400
      	});
        var pulaskiegoCircle = new google.maps.Circle({
    		strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: 'red',
            fillOpacity: 0.35,
            map: map,
            center: pulawskiegoStr.center,
            radius: 400
        });
        var pasiekaCircle = new google.maps.Circle({
    		strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: 'red',
            fillOpacity: 0.35,
            map: map,
            center: pasiekaStr.center,
            radius: 400
        });
        var nwkCircle = new google.maps.Circle({
    		strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: 'red',
            fillOpacity: 0.35,
            map: map,
            center: nowaWkStr.center,
            radius: 400
        });
        var grudziceCircle = new google.maps.Circle({
    		strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: 'red',
            fillOpacity: 0.35,
            map: map,
            center: grudziceStr.center,
            radius: 400
        });
        var strzeleckaCircle = new google.maps.Circle({
    		strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: 'red',
            fillOpacity: 0.35,
            map: map,
            center: strzeleckaStr.center,
            radius: 400
        });


    function markedCircle(circle, elemToMark ){
    	var dataToMark = $(`${elemToMark}`).parent();
    	var bigContainer = $('.big_data_container');
    	circle.addListener('mouseover', function() {
          dataToMark.css('border', '2px solid red');
          bigContainer.animate({opacity: 1, height: '90vh'}, 1000);

        });
    	circle.addListener('mouseout', function() {
          dataToMark.css('border', '2px solid transparent');
        });
    }
   	markedCircle(chabryCircle, '#chab');
    markedCircle(pulaskiegoCircle, '#pul');
    markedCircle(pasiekaCircle, '#pas');
    markedCircle(nwkCircle, '#nwk');
    markedCircle(grudziceCircle, '#gru');
    markedCircle(strzeleckaCircle, '#pil');
}