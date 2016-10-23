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
					map = new google.maps.Map(
						document.getElementById("mapContainer"), mapOptions
						);
					var marker = new google.maps.Marker({
						position: coords,
						map: map,
						title: "Your current location!"
					});
				});
			}else {
				alert("Geolocation API не поддерживается в вашем браузере");
			}
		}
	};
});