import axios from 'axios';
import * as moment from 'moment';
import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'

class App extends React.Component <{}, {data: any}> {
  public componentDidMount() {

    navigator.geolocation.getCurrentPosition((location) => {
      const userLat = location.coords.latitude;
      const userLng = location.coords.longitude;

      // Get weather data
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLng}&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
    .then(res => this.setState({data: res}));
    });
  }
  
  public render() {
    return (
      <div className="app">
        <WeatherSquare 
          day={moment().format('dddd')}
          icon="icon.ico"
          high="77"
          low="53"
        />
        <p>{'data: ' + JSON.stringify(this.state)}</p>
      </div>
    );
  }
}

export default App;
