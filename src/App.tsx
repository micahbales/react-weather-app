import axios from 'axios';
import * as React from 'react';
import {
  BrowserRouter as Router, 
  Link, 
  Route
} from 'react-router-dom';
import './App.css';
import {
  IWeatherSquare, 
  WeatherSquare
} from './WeatherSquare'

class App extends React.Component <{}, {weatherData: any}> {
  public componentDidMount() {
    // Get weather data
    axios.get(`https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where` + 
    `%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22washington%2C%20dc%22)&format=json`)
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
      const todayDesc = this.state.weatherData.data.query.results.channel.item.condition.text;
      const region = this.state.weatherData.data.query.results.channel.location.region;
      const todayHigh = this.state.weatherData.data.query.results.channel.item.forecast[0].high;
      const todayLow = this.state.weatherData.data.query.results.channel.item.forecast[0].low;
      const tempUnit = this.state.weatherData.data.query.results.channel.units.temperature;

      const weatherTodayProps: IWeatherSquare = {
        code: todayCode,
        day: 'Today',
        desc: todayDesc,
        high: todayHigh,
        low: todayLow,
        unit: tempUnit
      };

      return (
          <div className="app">
            <Router>
              <div>
                <Link to={'/'}>
                  <h1>Weather for {city}{region}</h1>
                </Link>
                <Link to={'/weather-today'}>
                  <p>See Today's Weather</p>
                </Link>
                <Link to={'/five-day-forecast'}>
                  <p>See the Five-Day Forecast</p>
                </Link>
                <Route path="/weather-today" render={() => {
                  return (
                    <div className="weather-today">
                      <h2>Today's Weather</h2>
                      <WeatherSquare {...weatherTodayProps} />
                    </div>
                  )
                }} />

                <Route path="/five-day-forecast" render={() =>  {
                  return (
                    <div>
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
                  )
                }} />
              </div>
            </Router>
            {/* <p>{JSON.stringify(this.state.weatherData.data.query.results.channel.item.condition.text)}</p> */}
          </div>
      );
    } else {
      return <div className="app">Loading...</div>
    }
    
  }
}

export default App;
