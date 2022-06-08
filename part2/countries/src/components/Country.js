import { useEffect, useState } from "react"
import axios from "axios"
import Weather from "./Weather"

const Country = ({ country }) => {
    const [weather, setWeather] = useState([])

    const api_key = process.env.REACT_APP_API_KEY;
    const lat = country.latlng[0];
    const lng = country.latlng[1];

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${api_key}&units=metric`)
            .then(response => {
                setWeather(response.data)
            })
    }, [api_key, lat, lng])

    const country_values = Object.values(country.languages);
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {country_values.map(c => <li key={c}>{c}</li>)}
            </ul>
            <img src={country.flags.png} alt={`flag of ${country.name.common}`}></img>
            <h2>Weather in {country.name.common}</h2>
            <Weather weather={weather} />
        </>
    )
}

export default Country