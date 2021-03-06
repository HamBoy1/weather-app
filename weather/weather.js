const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
    url:`https://api.forecast.io/forecast/336249c5d0f7070d2421734d7856e116/${lat},${lng}`,
    json: true
  },(error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        precipProbability: body.currently.precipProbability,
        summary: body.currently.summary
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
}

module.exports.getWeather = getWeather;
