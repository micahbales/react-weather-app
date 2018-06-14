import * as React from 'react';
import './App.css';
import WeatherSquare from './WeatherSquare'

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <WeatherSquare 
          day="Mon"
          icon="icon.ico"
          high="77"
          low="53"
        />
      </div>
    );
  }
}

export default App;
