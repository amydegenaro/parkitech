import axios from 'axios'

const GOT_WEATHER = 'GOT_WEATHER'

const gotWeather = weather => ({
  type: GOT_WEATHER,
  weather
})

export const getWeather = coordsArr => async dispatch => {
  try {
    const {data} = await axios.post('/api/weather/', coordsArr)
    dispatch(gotWeather(data))
  } catch (err) {
    console.error(err)
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GOT_WEATHER:
      return action.weather
    default:
      return state
  }
}
