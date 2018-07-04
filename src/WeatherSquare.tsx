import * as React from 'react';

interface IWeatherSquare {
    day: string;
    icon: string;
    high: string;
    low: string;
    units: string;
}

class WeatherSquare extends React.Component<IWeatherSquare> {
    public render() {
        const tempUnit = this.props.units === 'imperial' ? 'F' : (this.props.units === 'metric' ? 'C' : 'Kelvin');
        return (
            <div className="weather-square">
                <h3>{this.props.day}</h3>
                <img className="icon" src={`http://openweathermap.org/img/w/${this.props.icon}`}/>
                <div className="temps">
                    <label>High:</label>
                    <div className="high">{this.props.high} ˚{tempUnit}</div>
                    <label>Low:</label>
                    <div className="low">{this.props.low} ˚{tempUnit}</div>
                </div>
            </div>
        )
    }
}

export default WeatherSquare;