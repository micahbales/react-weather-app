import * as React from 'react';

interface IWeatherSquare {
    day: string;
    icon: string;
    high: string;
    low: string;
    unit: string;
}

class WeatherSquare extends React.Component<IWeatherSquare> {
    public render() {
        return (
            <div className="weather-square">
                <h3>{this.props.day}</h3>
                <img className="icon" src={`http://openweathermap.org/img/w/${this.props.icon}`}/>
                <div className="temps">
                    <label>High:</label>
                    <div className="high">{this.props.high} ˚{this.props.unit}</div>
                    <label>Low:</label>
                    <div className="low">{this.props.low} ˚{this.props.unit}</div>
                </div>
            </div>
        )
    }
}

export default WeatherSquare;