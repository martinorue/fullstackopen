import { useEffect, useState } from "react"
import axios from "axios"

const Country = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY;

    const [wheather, setWeather] = useState([])

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${api_key}`)
            .then(response => {
                setWeather(response.data)
            })
    })

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
            <h2>Wheather in {country.name.common}</h2>

        </>
    )
}

export default Country