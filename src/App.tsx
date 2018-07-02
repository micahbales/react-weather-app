import axios from 'axios';
import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'

class App extends React.Component {
  public componentDidMount() {
    // Get weather data
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=38.8900660&lon=-76.9303910&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP}`)
      .then(res => this.setState({data: res}));
  }
  
  public render() {
    return (
      <div className="app">
        <WeatherSquare 
          day="Mon"
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
