import * as React from 'react';

export interface IWeatherSquare {
    code: string;
    day: string;
    desc: string;
    high: string;
    low: string;
    unit: string;
}

export class WeatherSquare extends React.Component<IWeatherSquare> {
    public render() {
        return (
            <div className="weather-square">
                <h3>{this.props.day}</h3>
                <i className={`icon wi wi-yahoo-${this.props.code}`}/>
                <h5>{this.props.desc}</h5>
                <div className="temps">
                    <p>High:</p>
                    <p className="high">{this.props.high} ˚{this.props.unit}</p>
                    <p>Low:</p>
                    <p className="low">{this.props.low} ˚{this.props.unit}</p>
                </div>
            </div>
        )
    }
}