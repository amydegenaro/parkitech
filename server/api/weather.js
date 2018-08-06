const router = require('express').Router()
const axios = require('axios')
module.exports = router

let key
if (!process.env.DARK_SKY_SECRET) {
  console.log('Dark Sky secret not found - cannot get weather data')
} else {
  key = process.env.DARK_SKY_SECRET
}

router.post('/', async (req, res, next) => {
  try {
    const [lat, lon] = req.body
    const {data} = await axios.get(
      `https://api.darksky.net/forecast/${key}/${lat},${lon}`
    )
    res.json(data)
  } catch (err) {
    next(err)
  }
})
