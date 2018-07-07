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
      return (
        <div className="app">
          <h1>Weather for {this.state.weatherData.data.query.results.channel.location.city}{this.state.weatherData.data.query.results.channel.location.region}</h1>
          <div className="weather-now">
            <WeatherSquare 
              day={'Today'}
              icon={`.png`}
              high={this.state.weatherData.data.query.results.channel.item.forecast[0].high}
              low={this.state.weatherData.data.query.results.channel.item.forecast[0].low}
              unit={this.state.weatherData.data.query.results.channel.units.temperature}
            />
          </div>
          <div className="forecast">
            <h2>Five-Day Forecast</h2>
            <div className="five-day-forecast">
              {
                [1,2,3,4,5].map((num) => {
                  return (
                    <WeatherSquare 
                      day={this.state.weatherData.data.query.results.channel.item.forecast[num].day}
                      icon={`.png`}
                      high={this.state.weatherData.data.query.results.channel.item.forecast[num].high}
                      low={this.state.weatherData.data.query.results.channel.item.forecast[num].low}
                      unit={this.state.weatherData.data.query.results.channel.units.temperature}
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
