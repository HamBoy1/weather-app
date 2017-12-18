const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
    a: {
      demand: true,
      alias: 'address',
      describe:'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  }else {
    console.log(results.address);
    weather.getWeather(results.latitude,results.longitude, (error, weatherResults) => {
      if(error) {
        console.log(error);
      } else {
        console.log(`It's currently ${weatherResults.summary} with a temperature of ${weatherResults.temperature} degrees. It feels like ${weatherResults.apparentTemperature} degrees. There is a ${weatherResults.precipProbability}% chance of precipitation.`);
      }
    });
  }
});

console.log('Finding weather');


//336249c5d0f7070d2421734d7856e116
