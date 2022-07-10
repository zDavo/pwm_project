var map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 44.261965, lng: 12.348104 },
    zoom: 16
  });
  var marker = new google.maps.Marker({lat: 44.261965, lng: 12.348104, map: map});
}