angular
.module('mainApp')
.factory('Account', function($http, $localStorage) {
	return {
		getProfile: function() {
			return $http.get('https://www.googleapis.com/plus/v1/people/me');
		},
		initMap: function(){
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					var latitude = position.coords.latitude;
					var longitude = position.coords.longitude;
					var coords = new google.maps.LatLng(latitude, longitude);
					var mapOptions = {
						zoom: 15,
						center: coords,
						mapTypeControl: true,
						navigationControlOptions: {
							style: google.maps.NavigationControlStyle.SMALL
						},
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map(
						document.getElementById("mapContainer"), mapOptions
						);
					var markerLocation = new google.maps.Marker({
						position: coords,
						map: map,
						title: "Your current location!",
						icon: {
							path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
							scale: 7
						}
					});

					var request = {
						location: coords,
						radius: '4000',
						types: ['restaurant']
					};

					var service = new google.maps.places.PlacesService(map);
					service.nearbySearch(request, function(results, status) {
						if (status == google.maps.places.PlacesServiceStatus.OK) {
							for (var i = 0; i < results.length; i++) {
								var place = results[i];

								var marker = new google.maps.Marker({
									map: map,
									position: place.geometry.location,
									title: "Places where you can visit!"
								});
							}
						}
					});

				});
			}else {
				alert("Geolocation API не поддерживается в вашем браузере");
			}
		}
	}
});