// const GoogleMap = (()=> {
// 	//config for google maps
// 	type MapConfig = {
// 		basicMapConf: {
// 			domStr: string, 
// 			zoom: number,
// 			position: {
// 				lat: number,
// 				long: number
// 			} 
// 		}
// 	};

// 	const mapConfig: MapConfig = {
// 		basicMapConf: {
// 			domStr: 'map',
// 			zoom: 13,
// 			position: {
// 				lat: 50.6572484,
// 				long: 17.9211345
// 			}
// 		}
// 	};

// 	// map markers title and positions
// 	type MapMarkers = [[string, number, number]];

// 	const IJPMarkers: MapMarkers = [
// 		['Pasieka', 50.6619, 17.9201],
// 		['Chabry', 50.6791, 17.9265],
// 		['LO II', 50.6733, 17.925],
// 		['Grudzice', 50.6515, 17.9857],
// 		['Groszowice', 50.6249, 17.9594],
// 		['Nowa Wieś Królewska', 50.6533, 17.9521],
// 		['Al. Solidarności', 50.6747, 17.9679]
// 	];
// 	//loading map
// 	const mapLoad = ()=> {
// 		let script = document.createElement('script');
// 		script.type = 'text/javascript';
// 		script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCyeImWmy1LmNodXs2VPwMnW0-T_W_rHLw&callback=GoogleMap.create';
// 		document.body.appendChild(script);
// 	};

// 	//create map 
// 	const createMap = ()=> {
// 		// map position
// 		let centerPos = {
// 			lat: mapConfig.basicMapConf.position.lat, 
// 			lng: mapConfig.basicMapConf.position.long
// 		};

// 		// create map
//         let map = new google.maps.Map(document.getElementById(mapConfig.basicMapConf.domStr), {
//           zoom: mapConfig.basicMapConf.zoom,
//           center: centerPos
//         });

//         // loop for markers
//         IJPMarkers.forEach((elem)=> {
//         	let position = new google.maps.LatLng(elem[1], elem[2]);
// 			let windowContent = `<h1 class="map__info-header">${elem[0]}</h1>`;
// 			let infoWindow = new google.maps.InfoWindow({
// 				content: windowContent
// 			});
// 			infoWindow.setPosition(position);
// 			infoWindow.open(map);
//         });
// 	};

// 	return {
// 		init: mapLoad,
// 		create: createMap
// 	};

// })();
/**
 * +++ Interfaces +++
 */

// for functions that returns STRING and don't have any parameters
interface InterStringFunc {
	(): string;
}

// fomr IJP data object
interface InterIJPData {
	[propName: string]: any;
}

// for weather data object
interface InterWeatherData {
	current: {
		condition?: {
			[propName: string]: any;
		}
		[propName: string]: any;
	};
	location?: {};
}
// for IJP DOM string
interface InterIjpDomString {
	ijpContainer: string;
}

// for APIXU connection data
interface InterApixuConnData {
	apiKey: string;
	location: string;
}

// for IJP connection data
interface InterIJPConnData {
	apiKey: string;
	pointsId: {
		chabry: string;
		pulaskiego: string;
		pileckiego: string;
		pasieka: string;
		nowaWiesKrol: string;
		grudzice: string;
		osAlSolid: string;	
	}
}
/**
 * +++ Static classes +++
 * +++ +++ Connection status checking method
 * +++ +++ Conversion response to object
 */
class ConnectionHelpers {
	// check the status of the connection
	static connectionStatus(response): {} {
		if(response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(console.log(response.statusText));
		}
	}

	// convert recived data
	static getData(response): {} {
		let data: {};
		return data = response.json();
	}
}
// IJP connection class 
class Ijp {
	key: string;
	points: {};

	constructor(key: string, points: {}) {
		this.key = key;
		this.points = points;
	}

	// connection to IJP Api
	connectionToIJP() {
		for(let point of Object.values(this.points)){
			const request = new Request(`http://api.looko2.com/?method=GetLOOKO&id=${point}&token=${this.key}`, {
			method: 'GET'
			});
			fetch(request)
				.then(ConnectionHelpers.connectionStatus)
				.then(ConnectionHelpers.getData)
				.then(this.insertIJPData) 
		};
	}

	//insert IJP Data to DOM
	private insertIJPData(ijpData: InterIJPData) {
		const ijpDataStr: InterIjpDomString = {
			ijpContainer: '.data__container-ijp'
		};

		let html: string, stationName: string, ijpBcgColor: string, pm25BcgColor: string, pm10BcgColor: string,
		dataContainer = document.querySelector(ijpDataStr.ijpContainer);
console.log(ijpData);
		// change the name of teh IJP station
		const nameChange: InterStringFunc = () => {
			let station: string;

			if (ijpData.Name === 'Opole_Opolski_Alarm_Smogowy_Grud') {
				station = 'Grudzice';
			} else if (ijpData.Name === 'Opole_STE_Silesia_Chabry') {
				station = 'Osiedle Chabry';
			} else if (ijpData.Name === 'Opole_Opolski_Alarm_Smogowy_NWK') {
				station = 'Nowa Wieś Królewska';
			} else if (ijpData.Name === 'Opole_Komitet_Obrony_Pasieki_Pas') {
				station = 'Pasieka';
			} else if (ijpData.Name === 'Opole_Liceum_NR_II_Pulaskiego3') {
				station = 'LO nr II - Puławskiego';
			} else if (ijpData.Name === 'Opole_Opolski_Alarm_SmogowyBuhla') {
				station = 'Opole - Groszowice';
			} else if (ijpData.Name === 'Opole_OAS_AlSolidarnosci') {
				station = 'Aleja Solidarności';
			}
			return station;
		};

		// setting the bcg color of IJP container
		const checkValueOfIJP: InterStringFunc = () => {
			let ijpBcg: string;

			if (ijpData.IJP >= 0 && ijpData.IJP <= 1) {
				ijpBcg = 'data__bcg-dgreen';
			} else if (ijpData.IJP >= 2 && ijpData.IJP <= 3) {
				ijpBcg = 'data__bcg-green';
			} else if (ijpData.IJP >= 4 && ijpData.IJP <= 5) {
				ijpBcg = 'data__bcg-yellow';
			} else if (ijpData.IJP >= 6 && ijpData.IJP <= 7) {
				ijpBcg = 'data__bcg-orange';
			} else if (ijpData.IJP >= 8 && ijpData.IJP <= 9) {
				ijpBcg = 'data__bcg-red';
			} else if (ijpData.IJP >= 10) {
				ijpBcg = 'data__bcg-black';
			}
			return ijpBcg;
		};

		// setting the bcg color of PM2.5 container
		const checkValueOfPM25: InterStringFunc = () => {
			let pm25Bcg: string;

			if (ijpData.PM25 >= 0 && ijpData.PM25 <= 12) {
				pm25Bcg = 'data__bcg-dgreen';
			} else if (ijpData.PM25 >= 13 && ijpData.PM25 <= 36) {
				pm25Bcg = 'data__bcg-green';
			} else if (ijpData.PM25 >= 37 && ijpData.PM25 <= 60) {
				pm25Bcg = 'data__bcg-yellow';
			} else if (ijpData.PM25 >= 61 && ijpData.PM25 <= 84) {
				pm25Bcg = 'data__bcg-orange';
			} else if (ijpData.PM25 >= 85 && ijpData.PM25 <= 120) {
				pm25Bcg = 'data__bcg-red';
			} else if (ijpData.PM25 > 121) {
				pm25Bcg = 'data__bcg-black';
			}
			return pm25Bcg;
		};

		// setting the bcg color of PM10 container
		const checkValueOfPM10: InterStringFunc = () => {
			let pm10Bcg: string;

			if (ijpData.PM10 >= 0 && ijpData.PM10 <= 20) {
				pm10Bcg = 'data__bcg-dgreen';
			} else if (ijpData.PM10 >= 21 && ijpData.PM10 <= 60) {
				pm10Bcg = 'data__bcg-green';
			} else if (ijpData.PM10 >= 61 && ijpData.PM10 <= 100) {
				pm10Bcg = 'data__bcg-yellow';
			} else if (ijpData.PM10 >= 101 && ijpData.PM10 <= 140) {
				pm10Bcg = 'data__bcg-orange';
			} else if (ijpData.PM10 >= 141 && ijpData.PM10 <= 200) {
				pm10Bcg = 'data__bcg-red';
			} else if (ijpData.PM10 > 201) {
				pm10Bcg = 'data__bcg-black';
			}
			return pm10Bcg;
		};
		
		// get the correct station name
		stationName = nameChange();

		// get the IJP bcg color
		ijpBcgColor = checkValueOfIJP();

		//get the PM2.5 bcg color
		pm25BcgColor = checkValueOfPM25();

		//get the PM10 bcg color
		pm10BcgColor = checkValueOfPM10();

		html = `<div class="station__container">
						<h2 class="station__container-header">${stationName}</h2>
						<div class="station__container-data flex flex__row flex__justify-between">
							<div class="station__data-ijp ${ijpBcgColor}">
								<h3>IJP</h3>
								<p class="data__ijp">${ijpData.IJP}</p>
								<p class="text__ijp">${ijpData.IJPString}</p>
							</div>
							<div class="station__data-pm2 ${pm25BcgColor}">
								<h3>PM 2.5</h3>
								<p class="data__pm2">${ijpData.PM25}</p>
								<p class="units">&microg/m<sup>3</sup></p>
							</div>
							<div class="station__data-pm1 ${pm10BcgColor}">
								<h3>PM 10</h3>
								<p class="data__pm1">${ijpData.PM10}</p>
								<p class="units">&microg/m<sup>3</sup></p>
							</div>
						</div>
					</div>`;
		dataContainer.insertAdjacentHTML('beforeend', html);
	}
}

// weather connection class
class weather {
	key: string;
	location: string;
	
	constructor(key: string, location: string) {
		this.key = key;
		this.location = location;
	}

	// connection to APIXU API
	connectionToAPIXU = () => {
		const request = new Request(`http://api.apixu.com/v1/current.json?key=${this.key}&q=${this.location}`, {
			method: 'GET'
		});
		fetch(request)
			.then(ConnectionHelpers.connectionStatus)
			.then(ConnectionHelpers.getData)
			.then(this.insertDataToDom);
	}

	// insert data to DOM
	private insertDataToDom (weatherData: InterWeatherData) {
		const weatherDomStr = {
			lastUpdateContainer: '.weather__lastupdate-content',
			currentCondContainer: '.weather__currnet-condition',
			currentTempContainer: '.weather__currnet-temp',
			feelsTempContainer: '.feelstemp__container',
			windDirContainer: '.moredata__wind-dir',
			windSpeedContainer: '.windspeed-speed',
			pressureContainer: '.pressure__container',
			precipContainer: '.precip__container',
			humidityContainer: '.humidity__container'
		};

		let lastUpdate, 
			currentCondition, windDirection,
			lastUpdateCont = document.querySelector(weatherDomStr.lastUpdateContainer),
			currentCond = document.querySelector(weatherDomStr.currentCondContainer),
			currentTemp = document.querySelector(weatherDomStr.currentTempContainer).firstElementChild,
			feelsTemp = document.querySelector(weatherDomStr.feelsTempContainer).firstElementChild,
			windDir = document.querySelector(weatherDomStr.windDirContainer),
			windSpeed = document.querySelector(weatherDomStr.windSpeedContainer),
			pressure = document.querySelector(weatherDomStr.pressureContainer).firstElementChild,
			precip = document.querySelector(weatherDomStr.precipContainer).firstElementChild,
			humidity = document.querySelector(weatherDomStr.humidityContainer).firstElementChild;

		// last update info 
		const lastUpdateInfo = (): any[] => {
			let date: string, splitedDate: any[];

				date = weatherData.current.last_updated;
				splitedDate = date.split(" ");
				return splitedDate;
		};

		// check for current condition
		const checkCurrentWeatherCondition: InterStringFunc = () => {
			if (weatherData.current.is_day === 1) {
				if (weatherData.current.condition.code === 1000) {
					return '<i class="wi wi-day-sunny"></i>';
				} else if (weatherData.current.condition.code === 1003) {
					return '<i class="wi wi-day-cloudy"></i>';
				} else if(weatherData.current.condition.code === 1183) {
					return '<i class="wi wi-day-showers"></i>';
				} else if (weatherData.current.condition.code === 1276) {
					return '<i class="wi wi-day-storm-showers"></i>';
				}
			} else {
				if (weatherData.current.condition.code === 1000) {
					return '<i class="wi wi-night-clear"></i>';
				} else if (weatherData.current.condition.code === 1003) {
					return '<i class="wi wi-night-alt-cloudy"></i>';
				} else if(weatherData.current.condition.code === 1183) {
					return '<i class="wi wi-night-alt-showers"></i>'
				}else if (weatherData.current.condition.code === 1276) {
					return '<i class="wi wi-night-alt-storm-showers"></i>';
				}
			}
		};

		// check wind direction
		const checkWindDirection: InterStringFunc = () => {
					if(weatherData.current.wind_dir === 'N') {
						return '<i class="wi wi-wind wi-from-n"></i>';
					} else if(weatherData.current.wind_dir === 'NNE') {
						return '<i class="wi wi-wind wi-from-nne"></i>';
					} else if(weatherData.current.wind_dir === 'NE') {
						return '<i class="wi wi-wind wi-from-ne"></i>';
					} else if(weatherData.current.wind_dir === 'ENE') {
						return '<i class="wi wi-wind wi-from-ene"></i>';
					} else if(weatherData.current.wind_dir === 'E') {
						return '<i class="wi wi-wind wi-from-e"></i>';
					} else if(weatherData.current.wind_dir === 'ESE') {
						return '<i class="wi wi-wind wi-from-ese"></i>';
					} else if(weatherData.current.wind_dir === 'SE') {
						return '<i class="wi wi-wind wi-from-se"></i>';
					} else if(weatherData.current.wind_dir === 'SSE') {
						return '<i class="wi wi-wind wi-from-sse"></i>';
					} else if(weatherData.current.wind_dir === 'S') {
						return '<i class="wi wi-wind wi-from-s"></i>';
					} else if(weatherData.current.wind_dir === 'SSW') {
						return '<i class="wi wi-wind wi-from-ssw"></i>';
					} else if(weatherData.current.wind_dir === 'SW') {
						return '<i class="wi wi-wind wi-from-sw"></i>';
					} else if(weatherData.current.wind_dir === 'WSW') {
						return '<i class="wi wi-wind wi-from-wsw"></i>';
					} else if(weatherData.current.wind_dir === 'W') {
						return '<i class="wi wi-wind wi-from-w"></i>';
					} else if(weatherData.current.wind_dir === 'WNW') {
						return '<i class="wi wi-wind wi-from-wnw"></i>';
					} else if(weatherData.current.wind_dir === 'NW') {
						return '<i class="wi wi-wind wi-from-nw"></i>';
					} else if(weatherData.current.wind_dir === 'NNW') {
						return '<i class="wi wi-wind wi-from-nnw"></i>';
					}
		};

		// insert last update time to DOM
		lastUpdate = lastUpdateInfo();
		lastUpdateCont.innerHTML = `${lastUpdate[0]} - ${lastUpdate[1]}`;

		// insert current weather conditions to DOM
		currentCondition = checkCurrentWeatherCondition();
		currentCond.innerHTML = currentCondition;

		// insert currnet temp to the DOM
		currentTemp.innerHTML = weatherData.current.temp_c;

		// insert feels temp to DOM
		feelsTemp.innerHTML = weatherData.current.feelslike_c;

		// insert wind direction and speed to DOM
		windDirection = checkWindDirection();
		windDir.innerHTML = windDirection;
		windSpeed.innerHTML = weatherData.current.wind_kph;

		// insert pressure to DOM
		pressure.innerHTML = weatherData.current.pressure_mb;

		// insert precipitation to DOM
		precip.innerHTML = weatherData.current.precip_mm;

		//insert humidity to DOM
		humidity.innerHTML = weatherData.current.humidity;
	}
}

// apixu connection data
const apixuApi: InterApixuConnData = {
	apiKey: '48147044f89b4001831152133171402',
	location: 'Opole'
};
const apixuData = new weather(apixuApi.apiKey, apixuApi.location);
apixuData.connectionToAPIXU();

// IJP connection data
const ijpApi: InterIJPConnData = {
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
}
const ijpData = new Ijp(ijpApi.apiKey, ijpApi.pointsId);
ijpData.connectionToIJP();
