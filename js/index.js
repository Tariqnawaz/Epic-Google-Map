function initMap() {
    var sydney = {lat: 34.052235, lng: -118.243683};
    map = new google.maps.Map(document.getElementById('map'), {
      center: sydney,
      zoom: 11,
      mapTypeId: 'roadmap',
    });
    // infoWindow = new google.maps.InfoWindow();

    // searchButton = document.getElementById("searchButton").onclick = searchLocations;

    // locationSelect = document.getElementById("locationSelect");
    // locationSelect.onchange = function() {
    //   var markerNum = locationSelect.options[locationSelect.selectedIndex].value;
    //   if (markerNum != "none"){
    //     google.maps.event.trigger(markers[markerNum], 'click');
    //   }
    // };
  }