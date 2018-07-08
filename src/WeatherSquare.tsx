import * as React from 'react';

interface IWeatherSquare {
    code: string;
    day: string;
    desc: string;
    high: string;
    low: string;
    unit: string;
}

class WeatherSquare extends React.Component<IWeatherSquare> {
    public render() {
        return (
            <div className="weather-square">
                <h3>{this.props.day}</h3>
                <img className="icon" src={`${this.props.code}.png`}/>
                <h5>{this.props.desc}</h5>
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