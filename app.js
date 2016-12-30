function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialize);
    } else {
        alert("Deixa de ser paranoico. O Google sabe onde você está. Deixe-me saber também!");
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var map;
var service;
var infowindow;

function initialize(position) {
  var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pos,
      zoom: 15
    });

  var request = {
    location: pos,
    radius: window.prompt("Eu sei que tu eh preguicoso.\nMe diga quantos metros voce aguenta andar.", "200"),
    types: ['store'],
	type: 'restaurant'
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    /*for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log('point'+i, results[i]);
	  createMarker(map, results[i]);
    }*/
	var num = getRandomInt(0, results.length-1);
	createMarker(map, results[num]);
  }
}

function createMarker (map, object) {
	var marker = new google.maps.Marker({
	  position: object.geometry.location,
	  map: map,
	  title: object.name
	});
	contentString = 
		"Nome: "+object.name+"<br/>" +
		"Endereco: "+object.vicinity+"<br/>";
		
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	  });
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	  });
}
