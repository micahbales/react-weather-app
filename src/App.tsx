import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <WeatherSquare />
      </div>
    );
  }
}

export default App;
