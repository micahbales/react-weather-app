import * as React from 'react';

interface IWeatherSquare {
    day: string;
    icon: string;
    high: string;
    low: string;
}

class WeatherSquare extends React.Component<IWeatherSquare> {
    public render() {
        return (
            <div className="weather-square">
                <h1>{this.props.day}</h1>
                <div className="icon">{this.props.icon}</div>
                <div className="temps">
                    <li className="high">{this.props.high}</li>
                    <li className="low">{this.props.low}</li>
                </div>
            </div>
        )
    }
}

export default WeatherSquare;