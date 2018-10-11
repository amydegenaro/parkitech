// store to hold user's location
// create thunk to dispatch from component
// also create a separate file to store reusable get user location function

const GOT_LOCATION = 'GOT_LOCATION'

export const gotUserLocation = coords => ({
  type: GOT_LOCATION,
  location: coords
})

export const getUserLocation = () => dispatch => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        dispatch(gotUserLocation([pos.coords.latitude, pos.coords.longitude]))
      },
      () => {
        alert('Unable to retrieve location')
      },
      {
        enableHighAccuracy: true,
        timeout: 30000
      }
    )
  } else alert('Geolocation not supported')
}

export default function(state = [], action) {
  switch (action.type) {
    case GOT_LOCATION:
      return action.location
    default:
      return state
  }
}

// on home component mount, get location from redux store and fetch weather with those coords
