if (!navigator.geolocation) {
  alert('Geolocation is not supported by this browser!')
}

//This will make appear a pop up asking for permission
navigator.geolocation.getCurrentPosition(showPosition, error)

//In case the permission is granted
function showPosition(position) {
  a_lat = position.coords.latitude
  a_long = position.coords.longitude
}

//In case the permission is denied
function error() {
  alert(
    'Unable to retrieve your location! Allow the browser to share your location.'
  )
}
