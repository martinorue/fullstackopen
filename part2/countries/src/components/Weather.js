
const Weather = ({ weather }) => {
    if (weather) {
        if (weather.weather !== undefined) {
            let temp = weather.main.temp;
            let icon = weather.weather[0].icon;
            let wind = weather.wind.speed;
            return (
                <div>
                    <p>
                        temperature {temp} Celcius
                    </p>
                    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt='icon'></img>
                    <p>
                        wind {wind} m/s
                    </p>
                </div>
            )
        }
    }
}

export default Weather