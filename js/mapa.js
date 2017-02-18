var opoleStations = {
        grudziceStr: {
          center: {lat: 50.6515, lng: 17.9857}
        },
        nowaWiesKrStr: {
          center: {lat: 50.6533, lng: 17.9521}
        },
        chabryStr: {
          center: {lat: 50.6791, lng: 17.9265}
        },
        pasiekaStr: {
          center: {lat: 50.6619, lng: 17.9201}
        },
        pulaskiegoStr: {
          center: {lat: 50.6733, lng: 17.925}
        },
        strzeleckaStr : {
          center: {lat: 50.6711, lng: 17.9260}
        }
      };

    function initMap() {
    var uluru = {lat: 50.66696111, lng: 17.92279722};
    var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: uluru
    });
     for (var street in opoleStations) {
          var stationCircle = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 1,
            fillColor: '#00ff00',
            fillOpacity: 0.35,
            map: map,
            center: opoleStations[street].center,
            radius: 400
          });
        }
    }