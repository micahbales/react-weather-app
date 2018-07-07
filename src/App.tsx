import axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'
const units = 'imperial';

class App extends React.Component <{}, {currentData: any, forecastData: any}> {
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      const userLat = location.coords.latitude;
      const userLng = location.coords.longitude;
      
    // Get weather data (seems like we have to do two calls to get both current and forecast data?)
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLng}&units=${units}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
      .then((currentData) => {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${userLat}&lon=${userLng}&units=${units}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
          .then((forecastData) => {
          this.setState({
            currentData, 
            forecastData
          });
        });
      });
    });
  }
  
  public render() {
    if (this.state) {
      return (
        <div className="app">
          <div className="weather-now">
            <WeatherSquare 
              day={'Right Now'}
              icon={`${this.state.currentData.data.weather[0].icon}.png`}
              high={this.state.currentData.data.main.temp_max}
              low={this.state.currentData.data.main.temp_min}
              units={units}
            />
          </div>
          <div className="forecast">
            <h2>Five-Day Forecast</h2>
            <div className="five-day-forecast">
              {
                [3,11,19,27,35].map((num) => {
                  const dt = this.state.forecastData.data.list[num].dt * 1000;
                  return (
                    <WeatherSquare 
                      day={moment(dt).format('dddd')}
                      icon={`${this.state.forecastData.data.list[num].weather[0].icon}.png`}
                      high={this.state.forecastData.data.list[num].main.temp_max}
                      low={this.state.forecastData.data.list[num].main.temp_min}
                      units={units}
                      key={num}
                    />
                  )
                })
              }
            </div>
          </div>
          
          <p>{JSON.stringify(this.state.forecastData.data.temp)}</p>
        </div>
      );
    } else {
      return <div className="app">Loading...</div>
    }
    
  }
}

export default App;
