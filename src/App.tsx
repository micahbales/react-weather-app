import axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'

class App extends React.Component <{}, {weatherData: any}> {
  public componentDidMount() {

    navigator.geolocation.getCurrentPosition((location) => {
      const userLat = location.coords.latitude;
      const userLng = location.coords.longitude;

      // Get weather data
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLng}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
    .then(data => this.setState({weatherData: data}));
    });
  }
  
  public render() {
    if (this.state) {
      return (
        <div className="app">
          <WeatherSquare 
            day={moment().format('dddd')}
            icon={`${this.state.weatherData.data.weather[0].icon}.png`}
            high={this.state.weatherData.data.main.temp_max}
            low={this.state.weatherData.data.main.temp_min}
          />
          {/* <p>{JSON.stringify(this.state)}</p> */}
        </div>
      );
    } else {
      return <div className="app">Loading...</div>
    }
    
  }
}

export default App;
