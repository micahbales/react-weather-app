import axios from 'axios';
import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'

class App extends React.Component <{}, {weatherData: any}> {
  public componentDidMount() {
    // Get weather data
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22washington%2C%20dc%22)&format=json`)
    .then((weatherData) => {
      this.setState({
        weatherData
      });
    });
  }
  
  public render() {
    if (this.state) {
      const todayCode = this.state.weatherData.data.query.results.channel.item.condition.code;
      const city = this.state.weatherData.data.query.results.channel.location.city;
      const todayDesc = this.state.weatherData.data.query.results.channel.item.text;
      const region = this.state.weatherData.data.query.results.channel.location.region;
      const todayHigh = this.state.weatherData.data.query.results.channel.item.forecast[0].high;
      const todayLow = this.state.weatherData.data.query.results.channel.item.forecast[0].low;
      const tempUnit = this.state.weatherData.data.query.results.channel.units.temperature;

      return (
        <div className="app">
          <h1>Weather for {city}{region}</h1>
          <div className="weather-now">
            <WeatherSquare 
              code={todayCode}
              day={'Today'}
              desc={todayDesc}
              high={todayHigh}
              low={todayLow}
              unit={tempUnit}
            />
          </div>
          <div className="forecast">
            <h2>Five-Day Forecast</h2>
            <div className="five-day-forecast">
              {
                [1,2,3,4,5].map((num) => {
                  const forecastCode = this.state.weatherData.data.query.results.channel.item.forecast[num].code;
                  const day = this.state.weatherData.data.query.results.channel.item.forecast[num].day;
                  const forecastDesc = this.state.weatherData.data.query.results.channel.item.forecast[num].text;
                  const forecastHigh = this.state.weatherData.data.query.results.channel.item.forecast[num].high;
                  const forecastLow = this.state.weatherData.data.query.results.channel.item.forecast[num].low;

                  return (
                    <WeatherSquare 
                      code={forecastCode}
                      day={day}
                      desc={forecastDesc}
                      high={forecastHigh}
                      low={forecastLow}
                      unit={tempUnit}
                      key={num}
                    />
                  )
                })
              }
            </div>
          </div>
          
          {/* <p>{JSON.stringify(this.state.weatherData)}</p> */}
        </div>
      );
    } else {
      return <div className="app">Loading...</div>
    }
    
  }
}

export default App;
