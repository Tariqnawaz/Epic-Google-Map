var map;
var markers = [];
var infoWindow;

window.onload = () => {
  //displayStore();
}

function initMap() {
    var sydney = {lat: 34.052235, lng: -118.243683};
    map = new google.maps.Map(document.getElementById('map'), {
      center: sydney,
      zoom: 11,
      mapTypeId: 'terrain',
    });
    infoWindow = new google.maps.InfoWindow();
    search();
  }

  function displayStore(stores) {
    let html = '';
    let storeList = stores;
    storeList.forEach((store,index) => {
      const address = store['addressLines'];
      const phone = store['phoneNumber'];
      html += `
          <div class="store-list-container">
            <div class="store-list-address">
                <span> ${address[0]} </span>
                <span> ${address[1]} </span> 
                  <span>
                    <i class="fas fa-mobile-alt"></i>
                    ${phone} 
                  </span>
            </div>
            <div class="store-list-counter">
                ${index+1}
            </div>
          </div>
      `;
      document.querySelector('.store-container').innerHTML = html;
    });
    //showMarkers();
    //showStoreOnClick();
  }

  function showStoreOnClick() {
    const storeElement = document.querySelectorAll('.store-list-container')
    let storeList = stores;
    storeElement.forEach((store,index) => {
        store.addEventListener('click', function(){
          new google.maps.event.trigger(markers[index], 'click');
      });
    });
  }

  function createMarker(latlng, name, address,phone) {
   let infoHtml = `
      <div className='info-container'>
        <div className="info-container-name">
          ${name}
        </div>
        <div className="info-container-address">
          ${address}
        </div>  
        <div className="info-container-phone">
        <span><i class="fas fa-mobile-alt"></i>
             ${phone}
        </div>
      </div>
      ` 
    var marker = new google.maps.Marker({
      map: map,
      position: latlng
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(infoHtml);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }

  function showMarkers (stores) {
    let storeList = stores;
    var bounds = new google.maps.LatLngBounds();
    storeList.forEach((store,index) => {
      const address = store['addressLines'];
      const name = store['name'];
      const phone = store['phoneNumber'];
      var latlng = new google.maps.LatLng(
        parseFloat(store['coordinates']['latitude']),
        parseFloat(store['coordinates']['longitude']));
        createMarker(latlng, name, address, phone);
        bounds.extend(latlng);
    });
    map.fitBounds(bounds);
  }

  function search() {
    console.log('inside search');
    let foundStores = [];
    let zipCode = document.getElementById('zip-code').value;
    if(zipCode){
      console.log('zip found');
      for(var store of stores){
          var postal = store['address']['postalCode'].substring(0, 5);
          if(postal == zipCode){
              foundStores.push(store);
          }
      }
    } else {
      foundStores = stores;
    }
    document.getElementById('zip-code').value = '';
    clearLocations();
    displayStore(foundStores);
    showMarkers(foundStores);
    showStoreOnClick();
  }

  function clearLocations(){
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}