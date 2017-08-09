var GoogleMap = (function () {
    //config for google maps
    var mapConfig = {
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
    var IJPMarkers = [
        ['Pasieka', 50.6619, 17.9201],
        ['Chabry', 50.6791, 17.9265],
        ['LO II', 50.6733, 17.925],
        ['Grudzice', 50.6515, 17.9857],
        ['Groszowice', 50.6249, 17.9594],
        ['Nowa Wieś Królewska', 50.6533, 17.9521],
        ['Al. Solidarności', 50.6747, 17.9679]
    ];
    //loading map
    var mapLoad = function () {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCyeImWmy1LmNodXs2VPwMnW0-T_W_rHLw&callback=GoogleMap.create';
        document.body.appendChild(script);
    };
    //create map 
    var createMap = function () {
        // map position
        var centerPos = {
            lat: mapConfig.basicMapConf.position.lat,
            lng: mapConfig.basicMapConf.position.long
        };
        // create map
        var map = new google.maps.Map(document.getElementById(mapConfig.basicMapConf.domStr), {
            zoom: mapConfig.basicMapConf.zoom,
            center: centerPos
        });
        // loop for markers
        IJPMarkers.forEach(function (elem) {
            var position = new google.maps.LatLng(elem[1], elem[2]);
            var windowContent = "<h1 class=\"map__info-header\">" + elem[0] + "</h1>";
            var infoWindow = new google.maps.InfoWindow({
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
var IJPApi = (function (gmap) {
    //options for API
    var appOptions = {
        domStrings: {
            ijpData: '.station__data-ijp',
            pm10Data: '.station__data-pm1',
            pm25Data: '.station__data-pm2',
            IJPDataContainer: '.data__container-ijp',
            lastUpdateContainer: '.weather__lastupdate-content',
            cond: '.weather__currnet-condition',
            temp: '.weather__currnet-temp',
            fTemp: '.feelstemp__container',
            windDir: '.moredata__wind-dir',
            windSp: '.windspeed-speed',
            pressure: '.pressure__container',
            precip: '.precip__container',
            humidity: '.humidity__container'
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
    // check the status of the connection
    var connectionStatus = function (response) {
        if (response.status === 200) {
            return Promise.resolve(response);
        }
        else {
            return Promise.reject(console.log(response.statusText));
        }
    };
    // get data
    var getData = function (response) {
        var data;
        return data = response.json();
    };
    // connection to APIXU API
    var connectionToAPIXU = function () {
        var request = new Request("http://api.apixu.com/v1/current.json?key=" + appOptions.apixuApi.apiKey + "&q=" + appOptions.apixuApi.location, {
            method: 'GET'
        });
        fetch(request)
            .then(connectionStatus)
            .then(getData)
            .then(insertAPIXUData)
            .catch(function (error) {
            console.log(error);
        });
    };
    // connection to API - loop trought all IJP points
    var connectionToIJP = function () {
        for (var _i = 0, _a = Object.values(appOptions.ijpApi.pointsId); _i < _a.length; _i++) {
            var point = _a[_i];
            var request = new Request("http://api.looko2.com/?method=GetLOOKO&id=" + point + "&token=" + appOptions.ijpApi.apiKey, {
                method: 'GET'
            });
            fetch(request)
                .then(connectionStatus)
                .then(getData)
                .then(insertIJPData)
                .catch(function (error) {
                console.log(error);
            });
        }
        ;
        gmap.init();
    };
    // insert APIXU - weather data to DOM
    var insertAPIXUData = function (weatherData) {
        var lastUpdate, currentCondition, windDirection, lastUpdateCont = document.querySelector(appOptions.domStrings.lastUpdateContainer), currentCond = document.querySelector(appOptions.domStrings.cond), currentTemp = document.querySelector(appOptions.domStrings.temp).firstElementChild, feelsTemp = document.querySelector(appOptions.domStrings.fTemp).firstElementChild, windDir = document.querySelector(appOptions.domStrings.windDir), windSpeed = document.querySelector(appOptions.domStrings.windSp), pressureVal = document.querySelector(appOptions.domStrings.pressure).firstElementChild, precipVal = document.querySelector(appOptions.domStrings.precip).firstElementChild, humidityVal = document.querySelector(appOptions.domStrings.humidity).firstElementChild;
        // insert last update time to DOM
        lastUpdate = lastUpdateInfo(weatherData);
        lastUpdateCont.innerHTML = lastUpdate[0] + " - " + lastUpdate[1];
        // insert current condition to the DOM
        currentCondition = checkCurrentWeatherCondition(weatherData);
        currentCond.innerHTML = currentCondition;
        // insert currnet temp to the DOM
        currentTemp.innerHTML = weatherData.current.temp_c;
        // insert feels temp to DOM
        feelsTemp.innerHTML = weatherData.current.feelslike_c;
        // insert wind info to DOM
        windDirection = checkWindDirection(weatherData);
        windDir.innerHTML = windDirection;
        windSpeed.innerHTML = weatherData.current.wind_kph;
        // insert pressure info to DOM
        pressureVal.innerHTML = weatherData.current.pressure_mb;
        // insert precipitation info to DOM
        precipVal.innerHTML = weatherData.current.precip_mm;
        // insert humidity info to DOM
        humidityVal.innerHTML = weatherData.current.humidity;
    };
    // last update info 
    var lastUpdateInfo = function (weatherData) {
        var date = weatherData.current.last_updated, splitedDate = date.split(" ");
        return splitedDate;
    };
    // check the wind direction
    var checkWindDirection = function (weatherData) {
        if (weatherData.current.wind_dir === 'N') {
            return '<i class="wi wi-wind wi-from-n"></i>';
        }
        else if (weatherData.current.wind_dir === 'NNE') {
            return '<i class="wi wi-wind wi-from-nne"></i>';
        }
        else if (weatherData.current.wind_dir === 'NE') {
            return '<i class="wi wi-wind wi-from-ne"></i>';
        }
        else if (weatherData.current.wind_dir === 'ENE') {
            return '<i class="wi wi-wind wi-from-ene"></i>';
        }
        else if (weatherData.current.wind_dir === 'E') {
            return '<i class="wi wi-wind wi-from-e"></i>';
        }
        else if (weatherData.current.wind_dir === 'ESE') {
            return '<i class="wi wi-wind wi-from-ese"></i>';
        }
        else if (weatherData.current.wind_dir === 'SE') {
            return '<i class="wi wi-wind wi-from-se"></i>';
        }
        else if (weatherData.current.wind_dir === 'SSE') {
            return '<i class="wi wi-wind wi-from-sse"></i>';
        }
        else if (weatherData.current.wind_dir === 'S') {
            return '<i class="wi wi-wind wi-from-s"></i>';
        }
        else if (weatherData.current.wind_dir === 'SSW') {
            return '<i class="wi wi-wind wi-from-ssw"></i>';
        }
        else if (weatherData.current.wind_dir === 'SW') {
            return '<i class="wi wi-wind wi-from-sw"></i>';
        }
        else if (weatherData.current.wind_dir === 'WSW') {
            return '<i class="wi wi-wind wi-from-wsw"></i>';
        }
        else if (weatherData.current.wind_dir === 'W') {
            return '<i class="wi wi-wind wi-from-w"></i>';
        }
        else if (weatherData.current.wind_dir === 'WNW') {
            return '<i class="wi wi-wind wi-from-wnw"></i>';
        }
        else if (weatherData.current.wind_dir === 'NW') {
            return '<i class="wi wi-wind wi-from-nw"></i>';
        }
        else if (weatherData.current.wind_dir === 'NNW') {
            return '<i class="wi wi-wind wi-from-nnw"></i>';
        }
    };
    // check for current condition
    var checkCurrentWeatherCondition = function (weatherData) {
        if (weatherData.current.is_day === 1) {
            if (weatherData.current.condition.code === 1000) {
                return '<i class="wi wi-day-sunny"></i>';
            }
            else if (weatherData.current.condition.code === 1003) {
                return '<i class="wi wi-day-cloudy"></i>';
            }
        }
        else {
            if (weatherData.current.condition.code === 1000) {
                return '<i class="wi wi-night-clear"></i>';
            }
            else if (weatherData.current.condition.code === 1003) {
                return '<i class="wi wi-night-alt-cloudy"></i>';
            }
        }
    };
    // insert IJP - air condition data to DOM
    var insertIJPData = function (data) {
        var html, stationName, ijpBcgColor, pm25BcgColor, pm10BcgColor, container = document.querySelector(appOptions.domStrings.IJPDataContainer);
        // getting the coect nam of station
        stationName = nameChange(data);
        ijpBcgColor = checkValueOfIJP(data);
        pm25BcgColor = checkValueOfPM25(data);
        pm10BcgColor = checkValueOfPM10(data);
        // insertin data to the DOM
        html = "<div class=\"station__container\">\n\t\t\t\t\t\t<h2 class=\"station__container-header\">" + stationName + "</h2>\n\t\t\t\t\t\t<div class=\"station__container-data flex flex__row flex__justify-between\">\n\t\t\t\t\t\t\t<div class=\"station__data-ijp " + ijpBcgColor + "\">\n\t\t\t\t\t\t\t\t<h3>IJP</h3>\n\t\t\t\t\t\t\t\t<p class=\"data__ijp\">" + data.IJP + "</p>\n\t\t\t\t\t\t\t\t<p class=\"text__ijp\">" + data.IJPString + "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"station__data-pm2 " + pm25BcgColor + "\">\n\t\t\t\t\t\t\t\t<h3>PM 2.5</h3>\n\t\t\t\t\t\t\t\t<p class=\"data__pm2\">" + data.PM25 + "</p>\n\t\t\t\t\t\t\t\t<p class=\"units\">&microg/m<sup>3</sup></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"station__data-pm1 " + pm10BcgColor + "\">\n\t\t\t\t\t\t\t\t<h3>PM 10</h3>\n\t\t\t\t\t\t\t\t<p class=\"data__pm1\">" + data.PM10 + "</p>\n\t\t\t\t\t\t\t\t<p class=\"units\">&microg/m<sup>3</sup></p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>";
        container.insertAdjacentHTML('beforeend', html);
    };
    // change the name of teh IJP station
    var nameChange = function (data) {
        var station;
        if (data.Name === 'Opole_Opolski_Alarm_Smogowy_Grud') {
            station = 'Grudzice';
        }
        else if (data.Name === 'Opole_STE_Silesia_Chabry') {
            station = 'Osiedle Chabry';
        }
        else if (data.Name === 'Opole_Opolski_Alarm_Smogowy_NWK') {
            station = 'Nowa Wieś Królewska';
        }
        else if (data.Name === 'Opole_Komitet_Obrony_Pasieki_Pas') {
            station = 'Pasieka';
        }
        else if (data.Name === 'Opole_Liceum_NR_II_Pulaskiego3') {
            station = 'LO nr II - Puławskiego';
        }
        else if (data.Name === 'Opole_Opolski_Alarm_SmogowyBuhla') {
            station = 'Opole - Groszowice';
        }
        else if (data.Name === 'Opole_OAS_AlSolidarnosci') {
            station = 'Aleja Solidarności';
        }
        return station;
    };
    // setting the bcg color of IJP container
    var checkValueOfIJP = function (data) {
        var ijpBcg;
        if (data.IJP >= 0 && data.IJP <= 1) {
            ijpBcg = 'data__bcg-dgreen';
        }
        else if (data.IJP >= 2 && data.IJP <= 3) {
            ijpBcg = 'data__bcg-green';
        }
        else if (data.IJP >= 4 && data.IJP <= 5) {
            ijpBcg = 'data__bcg-yellow';
        }
        else if (data.IJP >= 6 && data.IJP <= 7) {
            ijpBcg = 'data__bcg-orange';
        }
        else if (data.IJP >= 8 && data.IJP <= 9) {
            ijpBcg = 'data__bcg-red';
        }
        else if (data.IJP >= 10) {
            ijpBcg = 'data__bcg-black';
        }
        return ijpBcg;
    };
    // setting the bcg color of PM2.5 container
    var checkValueOfPM25 = function (data) {
        var pm25Bcg;
        if (data.PM25 >= 0 && data.PM25 <= 12) {
            pm25Bcg = 'data__bcg-dgreen';
        }
        else if (data.PM25 >= 13 && data.PM25 <= 36) {
            pm25Bcg = 'data__bcg-green';
        }
        else if (data.PM25 >= 37 && data.PM25 <= 60) {
            pm25Bcg = 'data__bcg-yellow';
        }
        else if (data.PM25 >= 61 && data.PM25 <= 84) {
            pm25Bcg = 'data__bcg-orange';
        }
        else if (data.PM25 >= 85 && data.PM25 <= 120) {
            pm25Bcg = 'data__bcg-red';
        }
        else if (data.PM25 > 121) {
            pm25Bcg = 'data__bcg-black';
        }
        return pm25Bcg;
    };
    // setting the bcg color of PM10 container
    var checkValueOfPM10 = function (data) {
        var pm10Bcg;
        if (data.PM10 >= 0 && data.PM10 <= 20) {
            pm10Bcg = 'data__bcg-dgreen';
        }
        else if (data.PM10 >= 21 && data.PM10 <= 60) {
            pm10Bcg = 'data__bcg-green';
        }
        else if (data.PM10 >= 61 && data.PM10 <= 100) {
            pm10Bcg = 'data__bcg-yellow';
        }
        else if (data.PM10 >= 101 && data.PM10 <= 140) {
            pm10Bcg = 'data__bcg-orange';
        }
        else if (data.PM10 >= 141 && data.PM10 <= 200) {
            pm10Bcg = 'data__bcg-red';
        }
        else if (data.PM10 > 201) {
            pm10Bcg = 'data__bcg-black';
        }
        return pm10Bcg;
    };
    // public functions 
    return {
        init: function () {
            connectionToIJP();
            connectionToAPIXU();
        }
    };
})(GoogleMap);
IJPApi.init();
