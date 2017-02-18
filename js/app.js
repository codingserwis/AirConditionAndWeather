//*** KEY TO LOOKO2 API - 1487184056
	var apiKey = '1487184056';
	
// *** Sprawdzanie poziomu IJP
	function checkValueOfIjp(paramName, elemId){
			if(paramName >= 0 && paramName <= 1){
				elemId.css('background-color', 'blue');
			} else if(paramName >= 2 && paramName <= 3){
				elemId.css('background-color', 'green');
			} else if(paramName >= 4 && paramName <= 5){
				elemId.css('background-color', 'yellow');
			} else if(paramName >= 6 && paramName <= 7){
				elemId.css('background-color', 'orange');
			} else if(paramName >= 8 && paramName <= 9){
				elemId.css('background-color', 'red');
			} else if(paramName >= 10){
				elemId.css('background-color', 'brown');
			}
	}
	function checkValueOfPm2(paramName, elemId){
		if(paramName >= 0 && paramName <= 12){
				elemId.css('background-color', 'blue');
			} else if(paramName >= 13 && paramName <= 36){
				elemId.css('background-color', 'green');
			} else if(paramName >= 37 && paramName <= 60){
				elemId.css('background-color', 'yellow');
			} else if(paramName >= 61 && paramName <= 84){
				elemId.css('background-color', 'orange');
			} else if(paramName >= 85 && paramName <= 120){
				elemId.css('background-color', 'red');
			} else if(paramName > 121){
				elemId.css('background-color', 'brown');
			}
	}		
	function checkValueOfPm10(paramName, elemId){
		if(paramName >= 0 && paramName <= 20){
				elemId.css('background-color', 'blue');
			} else if(paramName >= 21 && paramName <= 60){
				elemId.css('background-color', 'green');
			} else if(paramName >= 61 && paramName <= 100){
				elemId.css('background-color', 'yellow');
			} else if(paramName >= 101 && paramName <= 140){
				elemId.css('background-color', 'orange');
			} else if(paramName >= 141 && paramName <= 200){
				elemId.css('background-color', 'red');
			} else if(paramName > 201){
				elemId.css('background-color', 'brown');
			}
	}		
// *** Połączenie z Api OSA Chabry ***	
	function connectionToApiChabry(){
		$.ajax({
			url: `http://api.looko2.com/?method=GetLOOKO&id=5ccf7fc18200&token=${apiKey}`,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			chabryInfo(response);
		}).fail(function(error){
			console.log(error);
		})
	}
// *** Połączenie z Api OSA Puławskiego ***
	function connectionToApiPulaskiego(){
		$.ajax({
			url: `http://api.looko2.com/?method=GetLOOKO&id=5ccf7fc255ee&token=${apiKey}`,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			pulaskiegoInfo(response);
		}).fail(function(error){
			console.log(error);
		})
	}
// *** Połączenie z Api OSA Pasieka ***
	function connectionToApiPasieka(){
		$.ajax({
			url: `http://api.looko2.com/?method=GetLOOKO&id=5ccf7fc17d7d&token=${apiKey}`,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			pasiekaInfo(response);
		}).fail(function(error){
			console.log(error);
		})
	}
// *** Połączenie z Api OSA Nowa Wieś Królewska ***
	function connectionToApiNwk(){
		$.ajax({
			url: `http://api.looko2.com/?method=GetLOOKO&id=5ccf7fc18052&token=${apiKey}`,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			NwkInfo(response);
		}).fail(function(error){
			console.log(error);
		})
	}
// *** Połączenie z Api OSA Grudzice ***
	function connectionToApiGrudzice(){
		$.ajax({
			url: `http://api.looko2.com/?method=GetLOOKO&id=60019400a82b&token=${apiKey}`,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			grudziceInfo(response);
		}).fail(function(error){
			console.log(error);
		})
	}
// *** Połączenie z Api OSA Pileckiego ***
	function connectionToApiPileckiego(){
		$.ajax({
			url: `http://api.looko2.com/?method=GetLOOKO&id=6001940094f8&token=${apiKey}`,
			dataType: 'json',
			type: 'GET'
		}).done(function(response){
			pileckiegoInfo(response);
		}).fail(function(error){
			console.log(error);
		})
	}
// *** Małe Info Chabry
	function chabryInfo(response){
		var ijp = $('#ch_ijp'),
			bigIjp = $('#cha_big_d_ijp'),
			bigPm2 = $('#big_cha_pm2'),
			bigPm2Box = $('#cha_big_d_pm2');
			bigPm10 = $('#big_cha_pm10'),
			pm01Box = $('#ch_pm1'), 
			bigIjpBox = $('#big_cha_ijp'),
			pm25Box = $('#ch_pm2'),
			pm10Box = $('#ch_pm10'),
			ijpVal = $('#ch_ijp_val'),
			pm01 = $('#ch_pm1_val'),
			pm25 = $('#ch_pm2_val'),
			pm10 = $('#ch_pm10_val');
			ijpVal.text(response.IJP);
			pm01.text(response.PM1);
			bigIjpBox.text(response.IJP);
			bigPm2.text(response.PM25);
			bigPm10.text(response.PM10);
			pm25.text(response.PM25);
			pm10.text(response.PM10);
			checkValueOfIjp(response.IJP, ijp);
			checkValueOfPm2(response.PM25, pm25Box);
			checkValueOfPm10(response.PM10, pm10Box);
	}
// *** Małe info Pułaskiego ***
	function pulaskiegoInfo(response){
		var ijp = $('#p_ijp'),
			pm01Box = $('#p_pm1'),
			pm25Box = $('#p_pm2'),
			pm10Box = $('#p_pm10'),
			ijpVal = $('#p_ijp_val'),
			pm01 = $('#p_pm1_val'),
			pm25 = $('#p_pm2_val'),
			pm10 = $('#p_pm10_val');
			ijpVal.text(response.IJP);
			pm01.text(response.PM1);
			pm25.text(response.PM25);
			pm10.text(response.PM10);
			checkValueOfIjp(response.IJP, ijp);
			checkValueOfPm2(response.PM25, pm25Box);
			checkValueOfPm10(response.PM10, pm10Box);
	}
// *** Małe info Pasieka ***
	function pasiekaInfo(response){
		var ijp = $('#pa_ijp'),
			pm01Box = $('#pa_pm1'),
			pm25Box = $('#pa_pm2'),
			pm10Box = $('#pa_pm10'),
			ijpVal = $('#pa_ijp_val'),
			pm01 = $('#pa_pm1_val'),
			pm25 = $('#pa_pm2_val'),
			pm10 = $('#pa_pm10_val');
			ijpVal.text(response.IJP);
			pm01.text(response.PM1);
			pm25.text(response.PM25);
			pm10.text(response.PM10);
			checkValueOfIjp(response.IJP, ijp);
			checkValueOfPm2(response.PM25, pm25Box);
			checkValueOfPm10(response.PM10, pm10Box);
	}
// *** Małe info Nowa Wieś Królewska ***
	function NwkInfo(response){
		var ijp = $('#nw_ijp'),
			pm01Box = $('#nw_pm1'),
			pm25Box = $('#nw_pm2'),
			pm10Box = $('#nw_pm10'),
			ijpVal = $('#nw_ijp_val'),
			pm01 = $('#nw_pm1_val'),
			pm25 = $('#nw_pm2_val'),
			pm10 = $('#nw_pm10_val');
			ijpVal.text(response.IJP);
			pm01.text(response.PM1);
			pm25.text(response.PM25);
			pm10.text(response.PM10);
			checkValueOfIjp(response.IJP, ijp);
			checkValueOfPm2(response.PM25, pm25Box);
			checkValueOfPm10(response.PM10, pm10Box);
	}
// *** Małe info Grudzice ***
	function grudziceInfo(response){
		var ijp = $('#g_ijp'),
			pm01Box = $('#g_pm1'),
			pm25Box = $('#g_pm2'),
			pm10Box = $('#g_pm10'),
			ijpVal = $('#g_ijp_val'),
			pm01 = $('#g_pm1_val'),
			pm25 = $('#g_pm2_val'),
			pm10 = $('#g_pm10_val');
			ijpVal.text(response.IJP);
			pm01.text(response.PM1);
			pm25.text(response.PM25);
			pm10.text(response.PM10);
			checkValueOfIjp(response.IJP, ijp);
			checkValueOfPm2(response.PM25, pm25Box);
			checkValueOfPm10(response.PM10, pm10Box);
	}
// *** Małe info Pileckiego ***
	function pileckiegoInfo(response){
		var ijp = $('#pi_ijp'),
			pm01Box = $('#pi_pm1'),
			pm25Box = $('#pi_pm2'),
			pm10Box = $('#pi_pm10'),
			ijpVal = $('#pi_ijp_val'),
			pm01 = $('#pi_pm1_val'),
			pm25 = $('#pi_pm2_val'),
			pm10 = $('#pi_pm10_val');
			ijpVal.text(response.IJP);
			pm01.text(response.PM1);
			pm25.text(response.PM25);
			pm10.text(response.PM10);
			checkValueOfIjp(response.IJP, ijp);
			checkValueOfPm2(response.PM25, pm25Box);
			checkValueOfPm10(response.PM10, pm10Box);
	}

// *** Fubkcja otwierająca dane szczegółowe z danego urządzenia
function bigWindowInfo(){
	var stationInfo = $('#more_info'),
		bigStationInfo = $('.big_data_container');
		stationInfo.on('click', function(){
			bigStationInfo.addClass('slide_right');
		}); 
}
$(document).ready(function(){
connectionToApiChabry();
connectionToApiPulaskiego();
connectionToApiPasieka();
connectionToApiNwk();
connectionToApiGrudzice();
connectionToApiPileckiego();
bigWindowInfo();
});

// *** Mapa Google ***
var chabryStr = {center: {lat: 50.6791, lng: 17.9265}},
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
    center: uluru
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

    chabryCircle.addListener('mouseover', function() {
          $('#s_chab').addClass('bigger');
        });
    chabryCircle.addListener('mouseout', function() {
          $('#s_chab').removeClass('bigger');
        });
    pulaskiegoCircle.addListener('mouseover', function() {
          $('#s_pul').addClass('bigger');
        });
    pulaskiegoCircle.addListener('mouseout', function() {
          $('#s_pul').removeClass('bigger');
        });
    pasiekaCircle.addListener('mouseover', function() {
          $('#s_pas').addClass('bigger');
        });
    pasiekaCircle.addListener('mouseout', function() {
          $('#s_pas').removeClass('bigger');
        });
    nwkCircle.addListener('mouseover', function() {
          $('#s_nwk').addClass('bigger');
        });
    nwkCircle.addListener('mouseout', function() {
          $('#s_nwk').removeClass('bigger');
        });
    grudziceCircle.addListener('mouseover', function() {
          $('#s_gru').addClass('bigger');
        });
    grudziceCircle.addListener('mouseout', function() {
          $('#s_gru').removeClass('bigger');
        });
    strzeleckaCircle.addListener('mouseover', function() {
          $('#s_pil').addClass('bigger');
        });
    strzeleckaCircle.addListener('mouseout', function() {
          $('#s_pil').removeClass('bigger');
        });
}