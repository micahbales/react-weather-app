import axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'
const units = 'imperial';

class App extends React.Component <{}, {weatherData: any}> {
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      const userLat = location.coords.latitude;
      const userLng = location.coords.longitude;
      
      // Get weather data
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLng}&units=${units}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
    .then(data => this.setState({weatherData: data}));
    });
  }
  
  public render() {
    if (this.state) {
      return (
        <div className="app">
          <div className="weather-now">
            <WeatherSquare 
              day={'Right Now'}
              icon={`${this.state.weatherData.data.weather[0].icon}.png`}
              high={this.state.weatherData.data.main.temp_max}
              low={this.state.weatherData.data.main.temp_min}
              units={units}
            />
          </div>
          <div className="forecast">
            <h2>Five-Day Forecast</h2>
            <div className="five-day-forecast">
              {
                [1,2,3,4,5].map((num) => {
                return (
                  <WeatherSquare 
                    day={moment().format('dddd')}
                    icon={`${this.state.weatherData.data.weather[0].icon}.png`}
                    high={this.state.weatherData.data.main.temp_max}
                    low={this.state.weatherData.data.main.temp_min}
                    units={units}
                    key={num}
                  />)
                })
              }
            </div>
          </div>
          
          {/* <p>{JSON.stringify(this.state)}</p> */}
        </div>
      );
    } else {
      return <div className="app">Loading...</div>
    }
    
  }
}

export default App;
