const GoogleMap = (()=> {

	//config for google maps
	const mapConfig = {
		basicMapConf: {
			domStr: 'map',
			zoom: 13,
			position: {
				lat: 50.6572484,
				long: 17.9211345
			}
		}
	};

	// map markers title and positions
	const IJPMarkers = [
		['Pasieka', 50.6619, 17.9201],
		['Chabry', 50.6791, 17.9265],
		['LO II', 50.6733, 17.925],
		['Grudzice', 50.6515, 17.9857],
		['Groszowice', 50.6249, 17.9594],
		['Nowa Wieś Królewska', 50.6533, 17.9521],
		['Al. Solidarności', 50.6747, 17.9679]
	];
	//loading map
	const mapLoad = ()=> {
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCyeImWmy1LmNodXs2VPwMnW0-T_W_rHLw&callback=GoogleMap.create';
		document.body.appendChild(script);
	};

	//create map 
	const createMap = ()=> {
		// map position
		let uluru = {
			lat: mapConfig.basicMapConf.position.lat, 
			lng: mapConfig.basicMapConf.position.long
		};

		// create map
        let map = new google.maps.Map(document.getElementById(mapConfig.basicMapConf.domStr), {
          zoom: mapConfig.basicMapConf.zoom,
          center: uluru
        });

        // loop for markers
        IJPMarkers.forEach((elem)=> {
        	let position = new google.maps.LatLng(elem[1], elem[2]);
			let windowContent = `<h1 class="map__info-header">${elem[0]}</h1>`;
			let infoWindow = new google.maps.InfoWindow({
				content: windowContent
			});
			infoWindow.setPosition(position);
			infoWindow.open(map);
        });
	};

	return {
		init: mapLoad,
		create: createMap
	};

})();



const IJPApi = ((gmap)=> {
	
	//options for API
	const appOptions = {
		domStrings: {
			ijpData: '.station__data-ijp',
			pm10Data: '.station__data-pm1',
			pm25Data: '.station__data-pm2',
			IJPDataContainer: '.data__container-ijp',
			cond: '.weather__currnet-condition',
			temp: '.weather__currnet-temp'
		},
		ijpApi: {
			apiKey: '1487184056',
			pointsId: {
				chabry: '5ccf7fc18200',
				pulaskiego: '5ccf7fc255ee',
				pileckiego: '6001940094f8',
				pasieka: '5ccf7fc17d7d',
				nowaWiesKrol: '5ccf7fc18052',
				grudzice: '60019400a82b',
				osAlSolid: 'a020a6036801'

			}
		},
		apixuApi: {
			apiKey: '48147044f89b4001831152133171402',
			location: 'Opole'
		}
	};
	// connection to APIXU API
	const connectionToAPIXU = ()=> {
		const request = new Request(`http://api.apixu.com/v1/current.json?key=${appOptions.apixuApi.apiKey}&q=${appOptions.apixuApi.location}`, {
			method: 'GET'
		});
		fetch(request)
			.then((response)=> {
				let weatherData;
				return weatherData = response.json();
			})
			.then((weatherData)=> {
				console.log(weatherData);
				insertAPIXUData(weatherData);
			});
	}
	// connection to API - loop trought all IJP points
	const connectionToIJP = ()=> {
		for(let point of Object.values(appOptions.ijpApi.pointsId)){
			const request = new Request(`http://api.looko2.com/?method=GetLOOKO&id=${point}&token=${appOptions.ijpApi.apiKey}`, {
			method: 'GET'
		});
		fetch(request)
			.then((response)=> {
				let data;
				return data = response.json();
			})
			.then((data)=> {
				console.log(data);
				insertIJPData(data)
			});
		};
	};

	// insert APIXU - weather data to DOM
	const insertAPIXUData = (weatherData)=> {
		let currentCondition,
			currentCond = document.querySelector(appOptions.domStrings.cond),
			currentTemp = document.querySelector(appOptions.domStrings.temp).firstElementChild;

		// insert current condition to the DOM
		currentCondition = checkCurrentWeatherCondition(weatherData);
		currentCond.innerHTML = currentCondition;
		
		//insert currnet tem to the DOM
		currentTemp.innerHTML = weatherData.current.temp_c;
	};

	// check for current condition
	const checkCurrentWeatherCondition = (weatherData)=> {
		 if (weatherData.current.is_day === 1) {
		 	if (weatherData.current.condition.code === 1000) {
		 		return '<i class="wi wi-day-sunny"></i>';
		 	} else if (weatherData.current.condition.code === 1003) {
		 		return '<i class="wi wi-day-cloudy"></i>';
		 	}
		 } else {
		 	if (weatherData.current.condition.code === 1000) {
		 		return '<i class="wi wi-night-clear"></i>';
		 	} else if (weatherData.current.condition.code === 1003) {
		 		return '<i class="wi wi-night-alt-cloudy"></i>';
		 	}
		 }
	};
	// insert IJP - air condition data to DOM
	const insertIJPData = (data)=> {
		let html, stationName, ijpBcgColor, pm25BcgColor, pm10BcgColor,
			container = document.querySelector(appOptions.domStrings.IJPDataContainer);
			// getting the coect nam of station
			stationName = nameChange(data);
			ijpBcgColor = checkValueOfIJP(data);
			pm25BcgColor = checkValueOfPM25(data);
			pm10BcgColor = checkValueOfPM10(data);

			// insertin data to the DOM
			html = `<div class="station__container">
						<h2 class="station__container-header">${stationName}</h2>
						<div class="station__container-data flex flex__row flex__justify-between">
							<div class="station__data-ijp ${ijpBcgColor}">
								<h3>IJP</h3>
								<p class="data__ijp">${data.IJP}</p>
								<p class="text__ijp">${data.IJPString}</p>
							</div>
							<div class="station__data-pm2 ${pm25BcgColor}">
								<h3>PM 2.5</h3>
								<p class="data__pm2">${data.PM25}</p>
								<p class="units">&microg/m<sup>3</sup></p>
							</div>
							<div class="station__data-pm1 ${pm10BcgColor}">
								<h3>PM 10</h3>
								<p class="data__pm1">${data.PM10}</p>
								<p class="units">&microg/m<sup>3</sup></p>
							</div>
						</div>
					</div>`;
			container.insertAdjacentHTML('beforeend', html);			
	};
	
	// change the name of teh IJP station
	const nameChange = (data)=> {
		let station;

		if (data.Name === 'Opole_Opolski_Alarm_Smogowy_Grud') {
			station = 'Grudzice';
		} else if (data.Name === 'Opole_STE_Silesia_Chabry') {
			station = 'Osiedle Chabry';
		} else if (data.Name === 'Opole_Opolski_Alarm_Smogowy_NWK') {
			station = 'Nowa Wieś Królewska';
		} else if (data.Name === 'Opole_Komitet_Obrony_Pasieki_Pas') {
			station = 'Pasieka';
		} else if (data.Name === 'Opole_Liceum_NR_II_Pulaskiego3') {
			station = 'LO nr II - Puławskiego';
		} else if (data.Name === 'Opole_Opolski_Alarm_SmogowyBuhla') {
			station = 'Opole - Groszowice';
		} else if (data.Name === 'Opole_OAS_AlSolidarnosci') {
			station = 'Aleja Solidarności';
		}
		return station;
	};

	// setting the bcg color of IJP container
	const checkValueOfIJP = (data)=> {
		let ijpBcg;

		if (data.IJP >= 0 && data.IJP <= 1) {
			ijpBcg = 'data__bcg-dgreen';
		} else if (data.IJP >= 2 && data.IJP <= 3) {
			ijpBcg = 'data__bcg-green';
		} else if (data.IJP >= 4 && data.IJP <= 5) {
			ijpBcg = 'data__bcg-yellow';
		} else if (data.IJP >= 6 && data.IJP <= 7) {
			ijpBcg = 'data__bcg-orange';
		} else if (data.IJP >= 8 && data.IJP <= 9) {
			ijpBcg = 'data__bcg-red';
		} else if (data.IJP >= 10) {
			ijpBcg = 'data__bcg-black';
		}

		return ijpBcg;
	};

	// setting the bcg color of PM2.5 container
	const checkValueOfPM25 = (data)=> {
		let pm25Bcg;

		if (data.PM25 >= 0 && data.PM25 <= 12) {
		 	pm25Bcg = 'data__bcg-dgreen';
	 	} else if (data.PM25 >= 13 && data.PM25 <= 36) {
			pm25Bcg = 'data__bcg-green';
		} else if (data.PM25 >= 37 && data.PM25 <= 60) {
			pm25Bcg = 'data__bcg-yellow';
		} else if (data.PM25 >= 61 && data.PM25 <= 84) {
			pm25Bcg = 'data__bcg-orange';
		} else if (data.PM25 >= 85 && data.PM25 <= 120) {
			pm25Bcg = 'data__bcg-red';
		} else if (data.PM25 > 121) {
			pm25Bcg = 'data__bcg-black';
		}

		return pm25Bcg;
	};

	// setting the bcg color of PM10 container
	const checkValueOfPM10 = (data)=> {
		let pm10Bcg;

		if (data.PM10 >= 0 && data.PM10 <= 20) {
			pm10Bcg = 'data__bcg-dgreen';
		} else if (data.PM10 >= 21 && data.PM10 <= 60) {
			pm10Bcg = 'data__bcg-green';
		} else if (data.PM10 >= 61 && data.PM10 <= 100) {
			pm10Bcg = 'data__bcg-yellow';
		} else if (data.PM10 >= 101 && data.PM10 <= 140) {
			pm10Bcg = 'data__bcg-orange';
		} else if (data.PM10 >= 141 && data.PM10 <= 200) {
			pm25Bcg = 'data__bcg-red';
		} else if (data.PM10 > 201) {
			pm25Bcg = 'data__bcg-black';
		}
		return pm10Bcg;
	};
    
	// public functions 
	return {
		init: ()=> {
			console.log('app is running!');
			connectionToIJP();
			connectionToAPIXU();
			gmap.init();
		}
	};
})(GoogleMap);

IJPApi.init();