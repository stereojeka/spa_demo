angular
.module('mainApp')
.controller('gmapController', function($scope, $http) {

	$http.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyAdXwfZB8dbfL2qxIZ9IbJJY-WuQfZaeIY&callback=initMap');
	
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

});