const IJPApi = (()=> {
	
	//options for API
	const appOptions = {
		ijpApi: {
			apiKey: '1487184056',
			pointsId: {
				chabry: '5ccf7fc18200',
				pulaskiego: '5ccf7fc255ee',
				pileckiego: '6001940094f8',
				pasieka: '5ccf7fc17d7d',
				nowaWiesKrol: '5ccf7fc18052',
				grudzice: '60019400a82b'

			}
		},
		apixuApi: {

		}
	};
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
				insertIJPData(data);
			});	
		};
	};
	// insert data to DOM
	const insertIJPData = (data)=> {
		let header = document.querySelector('.station__container-header'),
			ijp = document.querySelector('.data__ijp'),
			pm2 = document.querySelector('.data__pm2'),
			pm10 = document.querySelector('.data__pm1');

			header.innerHTML = data.Name;
			ijp.innerHTML = data.IJP;
			pm2.innerHTML = data.PM25;
			pm10.innerHTML = data.PM10;
	};

	// public functions 
	return {
		init: ()=> {
			console.log('app is running!');
			connectionToIJP();
		}
	};
})();

IJPApi.init();









// const connectionController = (()=> {
// 	const pointsConfig = {
// 		apiKey: '1487184056',
// 		points: {
// 			chabry: {
// 				key: '5ccf7fc18200'
// 			}
// 		}
// 	};
// 	return {
// 		connectToIJPApi: ()=> {

// 			console.log(pointsConfig);
// 			console.log('api con i done');
// 		},
// 		publicTest: ()=> {
// 			console.log('connectionCtrl is running!');
// 		}
// 	}
// })();
// const api = ((conCtrl)=>{
// 	return {
// 		init: ()=> {
// 			console.log('app is running!');
// 			conCtrl.connectToIJPApi();
// 			conCtrl.publicTest();
// 		}
// 	};
// })(connectionController);

// api.init();